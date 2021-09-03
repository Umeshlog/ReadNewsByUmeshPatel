import React, { Component } from "react";
import NewsItem from "./newsitem";
import Sppiner from "./sppiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      // totalResults: 38,
      totalResults: 0,
    };
    document.title = `${this.props.category.toUpperCase()} Newses`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6550aa7a91da4317b11df70a16b2e8c0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);

    // console.log(data)
    let parseddata = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    // con
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6550aa7a91da4317b11df70a16b2e8c0&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // // console.log(data)
    // let parseddata = await data.json();
    // this.setState({
    //   articles: parseddata.articles,
    //   totalArticles: parseddata.totalResults,
    //   loading: false,
    // });
    // console.log(parseddata);
    this.updateNews();
  }
  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${this.props.category}&apiKey=6550aa7a91da4317b11df70a16b2e8c0&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // // console.log(data)
    // let parseddata = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseddata.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    // if (
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${this.props.category}&apiKey=6550aa7a91da4317b11df70a16b2e8c0&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   console.log(data);
    //   let parseddata = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseddata.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6550aa7a91da4317b11df70a16b2e8c0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=65d1a8d7260d445287f84800e4cca3a3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=65d1a8d7260d445287f84800e4cca3a3&page=1&pagesize=5`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    console.log(data)
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
      // loading: false,
    });
  };
  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          News - Top {this.props.category.toUpperCase()} Headlines
        </h1>
        {this.state.loading && <Sppiner />}
        {/* <div className="row">
          {!this.state.loading &&
            this.state.articles.map((elm) => {
              return (
                <div className="col-md-4" key={elm.url}>
                  <NewsItem
                    title={elm.title ? elm.title.slice(0, 45) : ""}
                    description={
                      elm.description ? elm.description.slice(0, 88) : ""
                    }
                    imageurl={elm.urlToImage}
                    newsurl={elm.url}
                    author={elm.author}
                    date={elm.publishedAt}
                    source={elm.source.name}
                  />
                </div>
              );
            })}
        </div> */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Sppiner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((elm) => {
                return (
                  <div className="col-md-4" key={elm.url}>
                    <NewsItem
                      title={elm.title ? elm.title.slice(0, 45) : "Undefine"}
                      description={
                        elm.description ? elm.description.slice(0, 88) : ""
                      }
                      imageurl={elm.urlToImage}
                      newsurl={elm.url}
                      author={elm.author}
                      date={elm.publishedAt}
                      source={elm.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
