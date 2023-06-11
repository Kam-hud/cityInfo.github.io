new Vue({
    el: "#app",
    data: {
      cities: [],
      searchTerm: "",
      filteredCities: [],
      showList: false,
      currentPage: 1,
      pageSize: 2,
      totalPages: 50,
    },
    computed: {
      paginatedCities() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredCities.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.filteredCities.length / this.pageSize);
      }
    },
    methods: {
      handleInput() {
        if (this.searchTerm === "") {
          this.showList = false;
          this.filteredCities = this.cities;
        } else {
          this.showList = true;
          const regex = new RegExp(this.searchTerm, "gi");
          this.filteredCities = this.cities.filter(city => city.city.match(regex) || city.state.match(regex));
        }
      },
      handleClick(city) {
        this.showList = false;
        this.searchTerm = `${city.city}, ${city.state}`;
        this.filteredCities = [city];
        this.currentPage = 1;
      },
      fetchCities() {
        fetch(
          "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
        )
          .then(response => response.json())
          .then(data => {
            this.cities = data;
            this.filteredCities = data;
          })
          .catch(error => console.error(error));
      }
    },
    watch: {
      searchTerm: function (newValue) {
        this.showList = newValue !== "";
      }
    },
    created() {
      this.fetchCities();
    }
  });