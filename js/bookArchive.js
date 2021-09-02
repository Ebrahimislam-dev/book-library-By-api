const searchbook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    if (searchText === '') {
        const errormsg = document.getElementById('error-msg');
        errormsg.style.display = "block"
        document.getElementById('search-result').textContent = "";
        document.getElementById('total-search').textContent = "";
        document.getElementById('search-msg').textContent = "";

    }

    else {
        document.getElementById('search-msg').innerText = `Your ${searchText} books are`
        document.getElementById('error-msg').style.display = "none";
        // load data    
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
const displaySearchResult = books => {

    const searchresultDiv = document.getElementById('search-result');
    searchresultDiv.textContent = "";
    const booksNumber = books.length;
    document.getElementById('total-search').innerHTML = `<h4 class=" fw-bold text-center">About ${booksNumber} Results Found.....</h4>`;

    if (books.length === 0) {
        alert("no books found")

    };

    books.slice(0, 21).forEach(book => {
        console.log(book);
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
                    <h4 class=" fw-bold">${book.title? book.title:"Not found"}</h4>
                    <h6>Author: ${book.author_name ? book.author_name:"Not found"}</h6>
                    <h6>Publisher: ${book.publisher ? book.publisher:"Not found"}</h6>
                    <p >Publish Year: ${book.first_publish_year ? book.first_publish_year:"Not found"}</p>
                </div>
          </div>
        </div>
     </div>`;
        searchresultDiv.appendChild(div)

    })
}
