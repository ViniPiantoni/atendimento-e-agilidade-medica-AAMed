import { Component } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export default class Logout extends Component {
  componentWillMount() {
    const { push } = useHistory();
    async function logout() {
      await api.get('/hospital/logout', { withCredentials: true });
      push('/');
    }
    logout();
  }
  render() {
    return null;
  }
}
