import React, { Component, lazy, Suspense } from 'react';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Body.scss';

const Newsfeed = lazy(() => import('../Newsfeed/Newsfeed'));
const Post = lazy(() => import('../Newsfeed/Post'));
const Error = lazy(() => import('../Error/Error'));
const Slider = lazy(() => import('../Slider/Slider'));
const Mail = lazy(() => import('../Mail/Mail'));
const Auth = lazy(() => import('../Auth/Auth'));
const Chat = lazy(() => import('../Chat/Chat'));
const Left = lazy(() => import('../Left/Left'));
const Profile = lazy(() => import('../Profile/Profile'));
const Notice = lazy(() => import('../Notice/Notice'));
const Setting = lazy(() => import('../Setting/Setting'));
const Search = lazy(() => import('../Search/Search'));

const cx = classNames.bind(styles);

@withRouter
class Body extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isTop: true,
      isBottom: false,
      scrollBar: true,
    };
  }

  componentDidMount() {
    this.Body.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.Body.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if (this.state.scrollBar) {
      const dom = e.target;
      this.setState({
        isBottom: dom.scrollHeight - dom.scrollTop < dom.clientHeight + 100,
        isTop: dom.scrollTop === 0,
      });
    }
  }

  showScroll = (bool) => {
    this.setState({
      scrollBar: bool === undefined ? true : bool,
    });
  }

  isLoggedIn = () => {
    const { user } = this.props;
    return user && user.verify;
  }

  scrollToTop = () => {
    this.Body.scrollTop = 0;
    this.setState({
      isTop: true,
    });
  }

  render() {
    const { isTop, isBottom, scrollBar } = this.state;
    return (
      <div className={cx('Body', { 'body-scroll': scrollBar })} ref={(dom) => { this.Body = dom; }}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route
              path='/search/:type?/:query?'
              render={props => (
                <Search
                  {...props}
                  isBottom={isBottom}
                  url='/search'
                />
              )}
            />
            <Route
              path='/@:handle/:tab?'
              render={props => (
                <Profile
                  {...props}
                  isTop={isTop}
                  isBottom={isBottom}
                  showScroll={this.showScroll}
                  scrollToTop={this.scrollToTop}
                />
              )}
            />
            <Route
              path='/chat/:handle'
              render={props => (
                this.isLoggedIn()
                  ? (
                    <Chat
                      {...props}
                      showScroll={this.showScroll}
                    />
                  )
                  : <Redirect to='/auth/login/chat' />
              )}
            />
            <Route
              path='/chat'
              render={props => (
                this.isLoggedIn()
                  ? (
                    <Chat
                      {...props}
                      showScroll={this.showScroll}
                    />
                  )
                  : <Redirect to='/auth/login/chat' />
              )}
            />
            <Route
              path='/mail/:email/:link'
              render={props => (
                <Mail
                  {...props}
                  showScroll={this.showScroll}
                />
              )}
            />
            <Route
              path='/auth'
              render={props => (
                <Auth
                  {...props}
                  showScroll={this.showScroll}
                />
              )}
            />
            <Route
              path='/notice/:type?'
              render={props => (
                this.isLoggedIn()
                  ? (
                    <Notice
                      {...props}
                      isBottom={isBottom}
                      url='/notice'
                    />
                  )
                  : <Redirect to='/auth/login/notice' />
              )}
            />
            <Route
              path='/post/:id'
              render={props => (
                <Post {...props} />
              )}
            />
            <Route
              path='/setting/:tab?'
              render={props => (
                this.isLoggedIn()
                  ? (
                    <Setting
                      {...props}
                      url='/setting'
                    />
                  )
                  : <Redirect to='/auth/login/setting' />
              )}
            />
            <Route
              exact
              path='/'
              render={props => (
                this.isLoggedIn()
                  ? (
                    <div className='body-wrap'>
                      <Left {...props} />
                      <Newsfeed
                        {...props}
                        key='Home'
                        id='Home'
                        write
                        isBottom={isBottom}
                        options={{}}
                      />
                    </div>
                  )
                  : (
                    <Slider
                      {...props}
                      showScroll={this.showScroll}
                    />
                  )
              )}
            />
            <Route path='/error' component={Error} />
            <Redirect to='/error' />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default Body;
