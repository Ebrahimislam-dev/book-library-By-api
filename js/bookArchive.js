const searchbook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
     //clear displays content for new search'es
     document.getElementById('search-result').textContent = "";
     document.getElementById('total-search').textContent = "";
     document.getElementById('search-msg').textContent = "";
    // error handling to check if search field is empty or not 
    if (searchText === '') {
        const errormsg = document.getElementById('error-msg');
        errormsg.style.display = "block"
    }

    else {
        // hidding search data and total result data and displaying spinner
        toggleSpinner('visible');
        toggleSearchResult('hidden');

        document.getElementById('search-msg').innerText = `Your ${searchText} books are`
        document.getElementById('error-msg').style.display = "none";
        //  fetching book data from api  
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
// toggle spinner and search result by function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.visibility = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.visibility = displayStyle;
    document.getElementById('total-search').style.visibility = displayStyle;
}

// displaying book data by function
const displaySearchResult = books => {

    const searchresultDiv = document.getElementById('search-result');
    searchresultDiv.textContent = "";
    const booksNumber = books.length;
    document.getElementById('total-search').innerHTML = `
    <h4 class=" fw-bold text-center">About ${booksNumber} Books are Found.....</h4>
    `;
    // error handling if book doesn't exist 
    if (books.length === 0) {
        alert("Make sure that all words are spelled correctly, or try a different search.")


    };
    // loop through books array to find all book details 
    books.slice(0, 21).forEach(book => {

        // creating  a new card div dynamically for each book 
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100 mb-3">
        <div class="row g-0 p-3 h-100 border-4 rounded shadow">
          <div class="col-md-4 ">
          <img src=" https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : -1}-M.jpg" class="img-fluid rounded-start" alt="No image found">
          </div>
          <div class="col-md-8">
                <div class="card-body">
                    <h4 class=" fw-bold">${book.title ? book.title : "Not found"}</h4>
                    <h6>Author: ${book.author_name ? book.author_name : "Not found"}</h6>
                    <h6>Publisher: ${book.publisher ? book.publisher : "Not found"}</h6>
                    <p >Publish Year: ${book.first_publish_year ? book.first_publish_year : "Not found"}</p>
                </div>
          </div>
        </div>
     </div>`;
        searchresultDiv.appendChild(div)

    });
    // displaying search Results and hidding spinner
    toggleSpinner('hidden');
    toggleSearchResult('visible');
}
