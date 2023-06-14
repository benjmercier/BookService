/// <reference path="../knockout-3.5.1.js" />

var viewModel = function () {
    let self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();

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

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }
};

ko.applyBindings(new viewModel());