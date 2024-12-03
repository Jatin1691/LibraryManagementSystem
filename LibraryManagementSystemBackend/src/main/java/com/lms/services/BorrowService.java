package com.lms.services;

import com.lms.exception.BookOutOFStockException;
import com.lms.exception.BorrowNotFoundException;
import com.lms.exception.MaximumBooksBorrowedException;
import com.lms.model.*;
import com.lms.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    public List<Borrow> findAll(){
        List<Borrow> borrows = new ArrayList<>();

        borrowRepository.findAll().forEach(borrows::add);
        return borrows;
    }

    public Borrow findById(long id) {
        return borrowRepository.findById(id).orElseThrow(() -> new BorrowNotFoundException(id));
    }

    public List<Borrow> findByUserId(Long userID){
        return borrowRepository.findByUserId(userID);
    }

    public void deleteRequest(long id){
        borrowRepository.deleteById(id);
    }

    public List<Borrow> getPendingBorrowRequestsByUserId(Long userId) {
        List<BorrowStatus> statuses = Arrays.asList(BorrowStatus.PENDING, BorrowStatus.ACCEPTED);
        return borrowRepository.findByUserIdAndStatusIn(userId, statuses);
    }

    @Transactional
    public Borrow requestBook(Borrow borrowBody) {
        System.out.println(borrowBody.getUser());
        User user = userService.getUserByID(borrowBody.getUser().getId());
        Book book = bookService.getBookById(borrowBody.getBook().getId());

        List<Borrow> pendingRequests = getPendingBorrowRequestsByUserId(borrowBody.getUser().getId());
        if (pendingRequests.size() >= 2) {
            throw new MaximumBooksBorrowedException("You have reached the maximum limit of pending borrow requests.");
        }

        if (book.getAvailability() < 1) {
            throw new BookOutOFStockException(book.getBookTitle());
        }



        Date currentDate = new java.sql.Date(System.currentTimeMillis());
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        c.add(Calendar.DATE, 15);
        Date dueDate = new java.sql.Date(c.getTimeInMillis());

        Borrow borrow = new Borrow(user, book, currentDate, dueDate, BorrowStatus.PENDING);




        System.out.println(user.getName() + " has requested one copy of \"" + book.getBookTitle() + "\"!");

        return borrowRepository.save(borrow);
    }


    public Borrow acceptRequest(Borrow borrow) {
        Borrow request = findById(borrow.getBorrowId());

        Book book = bookService.getBookById(request.getBook().getId());
        if (book.getAvailability() < 1) {
            throw new BookOutOFStockException(book.getBookTitle());
        }

        request.setStatus(BorrowStatus.ACCEPTED);
        borrowRepository.save(request);

        book.borrowBook();
        bookService.updateBook(book);

        User user = request.getUser();
        user.userBookBorrow();
        userService.updateUser(user);

        return request;
    }

    public Borrow rejectRequest(Borrow borrow) {
        Borrow request = findById(borrow.getBorrowId());

        request.setStatus(BorrowStatus.REJECTED);
        return borrowRepository.save(request);
    }

    public List<BorrowDto> getAllBorrows(double finePerDay) {
        List<Borrow> borrows=new ArrayList<>();
        borrowRepository.findAll().forEach(borrows::add);
        List<BorrowDto> borrowDTOs = new ArrayList<>();

        for (Borrow borrow : borrows) {
            BorrowDto dto = new BorrowDto();
            dto.setBorrowId(borrow.getBorrowId());
            dto.setUserId(borrow.getUser().getId());
            dto.setBookId(borrow.getBook().getId());
            dto.setBorrowDate(borrow.getBorrowDate());
            dto.setDueDate(borrow.getDueDate());
            dto.setReturnDate(borrow.getReturnDate());
            dto.setStatus(borrow.getStatus());
            dto.setFine(borrow.calculateFine(finePerDay)); // Set the fine
            borrowDTOs.add(dto);
        }

        return borrowDTOs;
    }


    public Borrow returnBook(Borrow borrow){
        Borrow borrowBook = findById(borrow.getBorrowId());
        Book book = bookService.getBookById(borrowBook.getBook().getId());

        book.returnBook();
        bookService.updateBook(book);

        Date currentDate = new java.sql.Date(System.currentTimeMillis());
        borrowBook.setReturnDate(currentDate);



        User user = userService.getUserByID(borrowBook.getUser().getId());
        user.userReturnBook();
        userService.updateUser(user);

        borrowBook.setStatus(BorrowStatus.RETURNED);
        return borrowRepository.save(borrowBook);
    }
}