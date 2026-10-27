var movieName = document.getElementById("movieName")
var movieAuthor = document.getElementById("movieAuthor")
var movieCategory = document.getElementById("movieCategory")
var movieDescription = document.getElementById("movieDescription")
var movieImage = document.getElementById("movieImage")

var addBtn = document.getElementById("addButton")
var updateBtn = document.getElementById("updateButton")

var updateIndex;

var movieList = [];

if (localStorage.getItem("Movies")) {
    movieList = JSON.parse(localStorage.getItem("Movies"))

    display(movieList);
}

function addMovie() {
    var movie = {
        name: movieName.value,
        author: movieAuthor.value,
        category: movieCategory.value,
        description: movieDescription.value,
        image: movieImage.files[0].name
    }
    movieList.push(movie)

    display(movieList);

    resetData();

    localStorage.setItem("Movies", JSON.stringify(movieList))

}

function resetData() {
    movieName.value = ""
    movieAuthor.value = ""
    movieCategory.value = "Choose movie category"
    movieDescription.value = ""
    movieImage.value = ""
}

function display(targetArray) {
    box = ''
    for (var i = 0; i < targetArray.length; i++) {
        box += `<div class="col-sm-6 col-lg-4 col-xl-3">

                    <div class="card-body h-100 mb-2 d-flex flex-column">
                        <div><img src="./images/${targetArray[i].image}" class="card-img-top"></div>
                        <div class="card-content ms-2 d-flex flex-column flex-grow-1">
                            <h2 class="card-Name">${targetArray[i].name}</h2>
                            <h4 class="card-Author">By ${targetArray[i].author}</h4>
                            <h4 class="card-category">${targetArray[i].category}</h4>
                            <p class="card-text">${targetArray[i].description}</p>
                            <div class="card-footer mt-auto">
                                <div class="card-btn mb-2">
                                    <button class="update-btn " onclick="resetUpdateData(${targetArray.length < movieList.length ? targetArray[i].oldIndex : i})">update</button>
                                    <button class="delete-btn ms-2" onclick="deleteMovie(${targetArray.length < movieList.length ? targetArray[i].oldIndex : i})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("rowData").innerHTML = box
}

function deleteMovie(index) {
    movieList.splice(index, 1);
    localStorage.setItem("Movies", JSON.stringify(movieList))
    display(movieList)
}

function searchMovie(searchInputValue) {

    var searchMovies = []

    var searchValue = searchInputValue.value;
    for (var i = 0; i < movieList.length; i++) {
        if(movieList[i].name.toLowerCase().includes(searchValue.toLowerCase())){
            searchMovies.push(movieList[i])
            movieList[i].oldIndex=i;
        }
    }
    display(searchMovies)
}

function resetUpdateData(index){
    updateIndex = index
    movieName.value = movieList[updateIndex].name
    movieAuthor.value = movieList[updateIndex].author
    movieCategory.value = movieList[updateIndex].category
    movieDescription.value = movieList[updateIndex].description
    
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

function updateMovie(){
    movieList[updateIndex].name=movieName.value
    movieList[updateIndex].author=movieAuthor.value
    movieList[updateIndex].category=movieCategory.value
    movieList[updateIndex].description=movieDescription.value

    if(movieImage.files.length > 0){
        movieList[updateIndex].image = movieImage.files[0].name

    }

    localStorage.setItem("Movies",JSON.stringify(movieList))
    resetData()
    display(movieList)

    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

}


