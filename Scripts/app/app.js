/// <reference path="../knockout-3.5.1.js" />

var viewModel = function () {
    let self = this;

    // #region Books
    self.books = ko.observableArray();
    self.error = ko.observable();
    
    var booksUri = '/api/books/';    

    function ajaxHelper(uri, method, data) {
        self.error(''); // clears error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data
                ? JSON.stringify(data)
                : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    // fetches initial data
    getAllBooks();
    // #endregion

    // #region Detail
    self.detail = ko.observable();

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }
    // #endregion

    // #region Authors
    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    };

    var authorsUri = '/api/authors/';

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }

    getAuthors();
    // #endregion
};

ko.applyBindings(new viewModel());