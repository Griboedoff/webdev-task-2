'use strict';
const Place = require('./place');

module.exports = class PlacesRepo {
    constructor() {
        this.places = [];
        this.nextId = 0;
    }

    add(placeDescription) {
        const place = new Place(this.nextId++, placeDescription);
        this.places.push(place);
    }

    getAll() {
        return this.places;
    }

    getById(id) {
        return this.places.find(p => p.id === id);
    }

    update(id, description) {
        let place = this.getById(id);
        if (!place) {
            return false;
        }
        place.description = description;

        return place;
    }

    updateVisited(id) {
        let place = this.getById(id);
        if (!place) {
            return false;
        }
        place.visited = !place.visited;

        return place;
    }

    delete(id) {
        if (!this.getById(id)) {
            return false;
        }
        this.places = this.places.filter(place => place.id !== id);
    }

    deleteAll() {
        this.places = [];
    }

    swap(id1, id2) {
        let i1 = -1;
        let i2 = -1;

        for (let i = 0; i < this.places.length; i++) {
            if (this.places[i].id === id1) {
                i1 = i;
            }
            if (this.places[i].id === id2) {
                i2 = i;
            }
        }

        if (i1 <= 0 || i2 <= 0) {
            return false;
        }
        const tmp = this.places[i1];
        this.places[i1] = this.places[i2];
        this.places[i2] = tmp;

        return true;
    }

    getOrdered(comparator) {
        return this.places.sort(comparator);
    }

    getPage(start, limit) {
        return this.places.slice(start, start + limit);
    }
};
