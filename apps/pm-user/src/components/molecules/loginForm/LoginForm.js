import { Button, Form, Input, InputPassword, KeyOutlined, MailOutlined } from '../../atoms';
import { useOktaAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import _noop from 'lodash';
import { useHistory, Link } from 'react-router-dom';
import styles from './loginForm.module.scss';

const LoginForm = ({ onFormSubmit }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  const onFinish = (values) => {
    onFormSubmit(values.password, values.email);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            className="antdInput"
            type="email"
            placeholder="tanu@yopmail.com"
            prefix={<MailOutlined className={styles.inputIcon} />}
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            type="password"
            className="antdInput"
            placeholder="565BHOPALkatara"
            prefix={<KeyOutlined rotate="45" className={styles.inputIcon} size="large" />}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
        {!authState ? (<Button type="primary" loading>
          Loading
        </Button>) : (
          <Button 
            type="primary"
            htmlType="submit"
            block
            shape="round"
            size="medium"
            className={styles.logInButton}
          >
          Login
          </Button>
        )}
          
        </Form.Item>
      </Form>
      {/* <Link className={styles.forgotPassword} to="/forgot-password"><p>Forgot Password?</p></Link> */}
    </>
  );
};

LoginForm.propTypes = {
  onFormSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onFormSubmit: _noop,
};

export default LoginForm;
