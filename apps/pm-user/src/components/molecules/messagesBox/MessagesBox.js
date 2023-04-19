import { useState, useRef } from 'react';
import { Button, ClearOutlined, Modal, SendOutlined, TextArea } from '../../atoms';
import { OldMessages } from '..';
import { showNotification } from '@pm/pm-ui';
import PropTypes from 'prop-types';
import styles from './messagesBox.module.scss';
import axios from 'axios';

const baseUrl = 'https://pm-api-yr8y.onrender.com';
const oldBaseUrl = 'https://pmapi-pesto.herokuapp.com'; 

const MessagesBox = ({
  buttonForMailBox,
  classNamesObject,
  conversations,
  idOfLoggedInUser,
  interestSenderAge,
  interestSenderId,
  interestSenderImage,
  interestSenderName,
  interestReceiverAge,
  interestReceiverId,
  interestReceiverImage,
  interestReceiverName,
}) => {
  const messageRef = useRef();

  // Messaging Modal
  const [isMessagingModalVisible, setisMessagingModalVisible] = useState(false);

  const showMessagingModal = () => {
    setisMessagingModalVisible(true);
  };

  const handleNewMessageCancel = () => {
    setisMessagingModalVisible(false);
  };

  function sendNewMessageHandler() {
    showMessagingModal();
  }

  function sendMessageHandler() {
    const message = messageRef.current.resizableTextArea.props.value.trim();
    
    // Connect with Backend and save this message inside both users.

    const messageReceiverName = idOfLoggedInUser === interestSenderId ? interestReceiverName : interestSenderName;
    const messageReceiverId = idOfLoggedInUser === interestSenderId ? interestReceiverId : interestSenderId;
    if (message.trim().length > 0) {
      axios
        .post(
          `${baseUrl}/api/v1/conversations?sender=${idOfLoggedInUser}&receiver=${messageReceiverId}`,
          {
            message,
          }
        )
        .then((res) => {
          
          showNotification('success', 'Success!', `Your message has been sent to ${messageReceiverName}`);
        })
        .catch((error) => {
          console.log(error);
          showNotification('error', 'Error!', "Couldn't send your message. Please try later.");
        });
      handleNewMessageCancel();
    } else {
      showNotification('warn', 'Error!', "Message can't be empty.");
    }
  }

  function imageClickHandler(idOfLoggedInUser, interestSenderId, interestReceiverId) {
    if (idOfLoggedInUser === interestSenderId) {
      // open profile in new tab
      window.open(`/profile/${interestReceiverId}`, '_blank');
      return;
    }
    // open profile in new tab
    window.open(`/profile/${interestSenderId}`, '_blank');
  }

  // console.log(classNamesObject?.messagesBox);

  // const { messagesBox } = classNamesObject;

  // console.log(messagesBox);

  return (
    <>
      <div className={styles[`${classNamesObject?.messagesBox}`]}>
        <div className={styles[`${classNamesObject?.profileImage}`]}>
          <img
            src={idOfLoggedInUser === interestSenderId ? interestReceiverImage : interestSenderImage}
            alt={idOfLoggedInUser === interestSenderId ? interestReceiverName : interestSenderName}
            onClick={() => imageClickHandler(idOfLoggedInUser, interestSenderId, interestReceiverId)}
          />
        </div>
        <div className={styles[`${classNamesObject?.profileBrief}`]}>
          {idOfLoggedInUser === interestSenderId
            ? `${interestReceiverName}, ${interestReceiverAge}`
            : `${interestSenderName}, ${interestSenderAge}`}
        </div>
        <div className={styles[`${classNamesObject?.buttons}`]}>
          <Button type="primary" shape="round" icon={<SendOutlined />} size="middle" onClick={sendNewMessageHandler}>
            {buttonForMailBox ? 'View & Send' : ''}
          </Button>
        </div>
      </div>
      {/* Messaging Modal Start */}
      {isMessagingModalVisible && (
        <Modal
          title={`Sending Message to ${
            idOfLoggedInUser === interestSenderId ? interestReceiverName : interestSenderName
          }`}
          visible={isMessagingModalVisible}
          onCancel={handleNewMessageCancel}
          destroyOnClose={true}
          footer={null}
        >
          <h2 className={styles[`${classNamesObject?.heading}`]}>Previous Messages:</h2>
          <OldMessages
            conversations={conversations}
            idOfLoggedInUser={idOfLoggedInUser}
            interestSenderId={interestSenderId}
            interestReceiverId={interestReceiverId}
            interestSenderImage={interestSenderImage}
            interestReceiverImage={interestReceiverImage}
          />
          <br />
          <h2 className={styles[`${classNamesObject?.heading}`]}>Type your message below : </h2>
          <TextArea showCount maxLength={300} ref={messageRef} allowClear />
          <Button type="primary" shape="round" icon={<SendOutlined />} size="middle" onClick={sendMessageHandler}>
            Send Message
          </Button>
          <Button type="primary" shape="round" icon={<ClearOutlined />} size="middle" onClick={handleNewMessageCancel}>
            Cancel
          </Button>
        </Modal>
      )}
      {/* Messaging Modal End */}
    </>
  );
};

MessagesBox.propTypes = {
  conversations: PropTypes.array,
  idOfLoggedInUser: PropTypes.string,
  interestSenderAge: PropTypes.number,
  interestSenderId: PropTypes.string,
  interestSenderImage: PropTypes.string,
  interestSenderName: PropTypes.string,
  interestReceiverAge: PropTypes.number,
  interestReceiverId: PropTypes.string,
  interestReceiverImage: PropTypes.string,
  interestReceiverName: PropTypes.string,
};

MessagesBox.defaultProps = {
  conversations: [],
  idOfLoggedInUser: 'idOfLoggedInUser',
  interestSenderAge: 21,
  interestSenderId: 'interstSenderId',
  interestSenderImage: 'https://placehold.jp/40x40.png',
  interestSenderName: 'interestSenderName',
  interestReceiverAge: 21,
  interestReceiverId: 'interestReceiverId',
  interestReceiverImage: 'https://placehold.jp/40x40.png',
  interestReceiverName: 'interestReceiverName',
};

export default MessagesBox;
