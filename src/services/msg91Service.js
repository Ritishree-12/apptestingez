import axios from 'axios';

const MSG91_API_KEY = '395607ATzxdWwee644b4b4bP1';
const MSG91_SENDER_ID = '6464aa7dd6fc054a563a1713';

const generateOtp = async (mobileNumber) => {
  try {
    const response = await axios.post(
      'https://control.msg91.com/api/v5/flow/',
      {
        authkey: MSG91_API_KEY,
        mobile: mobileNumber,
        sender: MSG91_SENDER_ID,
        country: '91', // Change this based on your country code
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

const verifyOtp = async (mobileNumber, otp) => {
  try {
    const response = await axios.post(
      'https://control.msg91.com/api/v5/flow/',
      {
        authkey: MSG91_API_KEY,
        mobile: mobileNumber,
        otp: otp,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export { generateOtp, verifyOtp };
