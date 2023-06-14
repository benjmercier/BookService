/// <reference path="../knockout-3.5.1.js" />

import IndexVM from "./viewmodels/indexVM.js";

// The main entry point into the client side application

let index = IndexVM();

// fetches initial data
index.getAllBooks();

ko.applyBindings(index);