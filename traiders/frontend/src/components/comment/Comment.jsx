import { Comment as CommentAntd, Icon, Tooltip, Avatar } from 'antd';
import React from 'react';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      dislikes: 0,
      action: null
    };
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked'
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked'
    });
  };

  render() {
    const { likes, dislikes, action } = this.state;
    const { author, createdAt, content, image } = this.props;
    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>
    ];

    return (
      <div>
        <CommentAntd
          actions={actions}
          author={author}
          avatar={
            <Avatar
              src="https://img.pngio.com/avatar-user-computer-icons-software-developer-avatar-png-png-computer-user-900_540.jpg"
              alt={author}
            />
          }
          content={content}
          datetime={createdAt}
        />
        <div className="comment-image">
          <img className="image" src={image} alt={image} width="200px" />
        </div>
      </div>
    );
  }
}

export default Comment;
