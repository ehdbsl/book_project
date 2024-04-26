import React, { useState } from 'react';

function RegistrationForm() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPw_Re, setUserPw_Re] = useState('');
    const [name, setName] = useState('');
    const [hp, setHp] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('남자'); // Assuming default gender is '남자'
    const [ss1, setSS1] = useState('');
    const [ss2, setSS2] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [sample6Address, setSample6Address] = useState('');
    const [sample6DetailAddress, setSample6DetailAddress] = useState('');
    const [sample6ExtraAddress, setSample6ExtraAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your form submission logic goes here
        // You can access form data with the state variables defined above
    }

    const handleSSNCheck = () => {
        // Your SSN validation logic goes here
    }

    const handleAddressChange = (e) => {
        // Handle changes in address fields
        // You can implement logic to set address related state variables
    }

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="ssncheck" id="ssncheck" value="n" />
                <p>아이디:<input type="text" name="userid" value={userId} onChange={(e) => setUserId(e.target.value)} maxLength="20" /></p>
                <p>패스워드:<input type="password" name="userpw" value={userPw} onChange={(e) => setUserPw(e.target.value)} maxLength="20" /></p>
                <p>패스워드:<input type="password" name="userpw_re" value={userPw_Re} onChange={(e) => setUserPw_Re(e.target.value)} maxLength="20" /></p>
                <p>이름:<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength="10" /></p>
                <p>휴대폰번호:<input type="text" name="hp" value={hp} onChange={(e) => setHp(e.target.value)} maxLength="20" /></p>
                <p>이메일:<input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength="50" /></p>
                <p>성별: <label htmlFor="mail">남자</label> <input type="radio" name="gender" value="남자" checked={gender === '남자'} onChange={() => setGender('남자')} />
                    <label htmlFor="femail">여자</label> <input type="radio" name="gender" value="여자" checked={gender === '여자'} onChange={() => setGender('여자')} />
                </p>
                <p>주민등록번호: <input type="text" name="ss1" value={ss1} onChange={(e) => setSS1(e.target.value)} maxLength="6" className="ssn" /> - <input type="text" name="ss2" value={ss2} onChange={(e) => setSS2(e.target.value)} maxLength="7" className="ssn" />
                    <button type="button" onClick={handleSSNCheck} id="ssncheckBtn">주민번호검증</button>
                </p>
                <p>우편번호: <input type="text" name="zipcode" value={zipcode} maxLength="5" id="sample6_postcode" placeholder="우편번호" onChange={(e) => setZipcode(e.target.value)} />
                    <button type="button" onClick={sample6_execDaumPostcode}>우편번호찾기</button></p>
                <p>주소: <input type="text" name="sample6_address" value={sample6Address} id="sample6_address" placeholder="주소" onChange={handleAddressChange} /></p>
                <p>상세주소: <input type="text" name="address2" value={sample6DetailAddress} id="sample6_detailAddress" placeholder="상세주소" onChange={(e) => setSample6DetailAddress(e.target.value)} /></p>
                <p>참고사항: <input type="text" name="address3" value={sample6ExtraAddress} id="sample6_extraAddress" placeholder="참고항목" onChange={(e) => setSample6ExtraAddress(e.target.value)} /></p>
                <p><button type="submit">가입완료</button><button type="reset">다시작성</button></p>
            </form>
        </div>
    );
}

export default RegistrationForm;