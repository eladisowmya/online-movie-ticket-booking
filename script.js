// Load movies
fetch("/api/movies")
.then(response => response.json())
.then(movies => {

    const movieList = document.getElementById("movieList");

    movies.forEach(movie => {

        movieList.innerHTML += `
            <div class="movie-card">
                <h3>${movie.movie_name}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Language: ${movie.language}</p>
                <p>Duration: ${movie.duration} minutes</p>
                <p>${movie.description}</p>
            </div>
        `;

    });

})
.catch(error => console.log(error));


// Load shows
fetch("/api/shows")
.then(response => response.json())
.then(shows => {

    const showList = document.getElementById("showList");
    const showSelect = document.getElementById("showSelect");

    shows.forEach(show => {

        showList.innerHTML += `
            <div class="show-card">
                <h3>${show.movie_name}</h3>
                <p>Date: ${show.show_date}</p>
                <p>Time: ${show.show_time}</p>
                <p>Theatre: ${show.theater_name}</p>
                <p>Ticket Price: ₹${show.ticket_price}</p>
            </div>
        `;

        showSelect.innerHTML += `
            <option value="${show.id}">
                ${show.movie_name} - ${show.show_time}
                - ₹${show.ticket_price}
            </option>
        `;

    });

})
.catch(error => console.log(error));