package com.lms.controller;

import com.lms.model.Borrow;
import com.lms.model.BorrowDto;
import com.lms.repository.BorrowRepository;
import com.lms.services.BookService;
import com.lms.services.BorrowService;
import com.lms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BorrowBookController {

    @Autowired
    private BorrowService borrowService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private BorrowRepository borrowRepository;

    @GetMapping("/borrow")
    public List<Borrow> getAllBorrows() {
        return borrowService.findAll();
    }


    @GetMapping("/fine")
    public ResponseEntity<List<BorrowDto>> getAllBorrows(@RequestParam double finePerDay) {
        List<BorrowDto> borrowDTOs = borrowService.getAllBorrows(finePerDay);
        return ResponseEntity.ok(borrowDTOs);
    }

    @GetMapping("/borrow/{id}")
    public Borrow getRequestsByID(@PathVariable long id) {
        return borrowService.findById(id);
    }

    @GetMapping("/borrow/user/{userID}")
    public List<Borrow> getBorrowedBooks(@PathVariable long userID) {
        return borrowService.findByUserId(userID);
    }

    @PostMapping("/borrow")
    public Borrow requestBook(@RequestBody Borrow borrow) {
        return borrowService.requestBook(borrow);
    }

    @PutMapping("/borrow/accept")
    public Borrow acceptRequest(@RequestBody Borrow borrow) {
        return borrowService.acceptRequest(borrow);
    }

    @PutMapping("/borrow/reject")
    public Borrow rejectRequest(@RequestBody Borrow borrow) {
        return borrowService.rejectRequest(borrow);
    }

    @PutMapping("/borrow/return")
    public Borrow returnBook(@RequestBody Borrow borrow) {
        return borrowService.returnBook(borrow);
    }

    @GetMapping("/borrow/book/{id}")
    public List<Borrow> bookBorrowHistory(@PathVariable long id) {
        return borrowRepository.findByBookId(id);
    }
}
