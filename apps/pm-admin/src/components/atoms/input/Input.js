import { Input as AntdInput } from 'antd';
const InputPassword = AntdInput.Password;
import PropTypes from 'prop-types'; 

const Input = ({ placeholder, prefix, size, type, ...restProps }) => {
  "hi"
  return (
    <AntdInput
      {...restProps}
      style={{
        border: "2px solid #bababa",
        padding: "4px 12px",
        width: "250px",
        borderRadius: "0.5rem",
        marginBottom: "-10px",
        fontFamily: "Lato"
      }}
      placeholder={placeholder}
      type={type}
      prefix={prefix}
      size={size}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  prefix: PropTypes.object,
  size: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  placeholder: 'input',
  prefix: '<UserOutlined className={styles.inputIcon} />',
  size: 'large',
  type: 'text',
};

export { Input, InputPassword };

