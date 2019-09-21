import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage = (imageUrl) => {
    return <img src = {"https://blogster-bucket-8358.s3.ap-south-1.amazonaws.com/"+imageUrl} alt = "This is a blog image"/>
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content , imageUrl } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{this.renderImage(imageUrl)}</p>
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
