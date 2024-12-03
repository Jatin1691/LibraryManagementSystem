package com.lms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "Borrow")
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long borrowId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("borrows")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonIgnoreProperties("borrows")
    private Book book;

    @Enumerated(EnumType.STRING)
    private BorrowStatus status;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date borrowDate;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date returnDate;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using=JsonDataSerializer.class)
    Date dueDate;

    private double fine;

    public Borrow() {
    }

    public Borrow(User user, Book book, Date borrowDate, Date dueDate, BorrowStatus status) {
        this.user = user;
        this.book = book;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public long getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(long borrowId) {
        this.borrowId = borrowId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }


    public BorrowStatus getStatus() {
        return status;
    }

    public void setStatus(BorrowStatus status) {
        this.status = status;
    }

    public double getFine() {
        return fine;
    }

    public void setFine(double fine) {
        this.fine = fine;
    }

    public double calculateFine(double finePerDay) {
        // If the book is not returned yet, use the current date
        Date effectiveReturnDate = (returnDate != null) ? returnDate : new Date(System.currentTimeMillis());

        // Check if the book is overdue
        if (effectiveReturnDate.after(dueDate)) {
            // Calculate the difference in milliseconds
            long overdueMillis = effectiveReturnDate.getTime() - dueDate.getTime();
            // Convert milliseconds to days
            long overdueDays = overdueMillis / (1000 * 60 * 60 * 24);
            // Calculate the fine
            return overdueDays * finePerDay;
        }

        // No fine if not overdue
        return 0.0;
    }




    @Override
    public String toString() {
        return "Borrow{" +
                "borrowId=" + borrowId +
                ", bookId=" + book +
                ", userId=" + user +
                ", status='" + status + '\'' +
                ", borrowDate=" + borrowDate +
                ", returnDate=" + returnDate +
                ", dueDate=" + dueDate +
                '}';
    }
}
