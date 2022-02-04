import { Component } from "mahal";

export class BaseComponent extends Component {
    get store() {
        return this.global.store;
    }
}