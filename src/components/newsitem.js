import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "10%", zIndex: 1 }}
          >
            {source}
          </span>
          <img
            src={
              !imageurl
                ? "https://images.moneycontrol.com/static-mcnews/2020/10/Nissan-Magnite-01-770x433.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Uknown" : author} On{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreffral" href={newsurl} className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
