/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
const { UserName, Password, Submit, VerifyCode, LoginCode } = Login;
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VCode: ""
    }
  }
  handleSubmit = (err, values) => {

    const { dispatch } = this.props;
    if (!err) {
      if (values.verifyCode != this.state.VCode) {
        alert("请输入正确的验证码！")
        return;
      }
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  }
  getCode = (code) => {
    this.setState({
      VCode: code
    })
  }
  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login onSubmit={this.handleSubmit}>
          <div>
            <UserName name="userName" placeholder="Account" />
            <Password name="password" placeholder="Password" />
            <div className={styles.verify}>
              <VerifyCode name="verifyCode" placeholder="Verification Code" />
            </div>
            <LoginCode ChildGetCode={(code) => this.getCode(code)}></LoginCode>
          </div>
          <Submit loading={submitting}>Login</Submit>
        </Login>
      </div>
    );
  }
}
