const searchbook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = "";
    if (searchText == '') {
        const errormsg = document.getElementById('error-msg');
        errormsg.style.display = "block"
        document.getElementById('search-result').textContent = "";
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
    document.getElementById('total-search').innerHTML = `<h4 class=" fw-bold text-center">About ${booksNumber} results.....</h4>`;



    if (books.length === 0) {
        alert("no books found")
        // document.getElementById('error-msg2').style.display = 'block';
    };




    books.slice(0, 15).forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100 mb-3" style="max-width: 450px;">
        <div class="row g-0">
          <div class="col-md-4 ">
          <img src=" https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : -1}-M.jpg" class="img-fluid rounded-start" alt="No image found">
          </div>
          <div class="col-md-8">
                <div class="card-body">
                    <h4 class=" fw-bold">${book.title}</h4>
                    <h6>Author: ${book.author_name}</h6>
                    <h6>Publisher: ${book.publisher}</h6>
                    <p >Publish Year: ${book.first_publish_year}</p>
                </div>
          </div>
        </div>
     </div>`;
        searchresultDiv.appendChild(div)

    })
}
