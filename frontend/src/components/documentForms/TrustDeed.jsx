function TrustDeed() {
    return ( 
        <div className="agreement-form-page">
            <div className="container">
                <div className="agreement-form-wrapper">
                    <h2>Enter The Details for Trust Deed</h2>
                    <form className="agreement-form">
                        <div className="form-inputs">
                            <div>
                                <label htmlFor="place-of-agreement">Enter Place Of Agreement:</label>
                                <input placeholder="eg. Chennai, Tamil Nadu" type="text" name="place-of-agreement"/>
                            </div>
                            <div>
                                <label htmlFor="trustors-name">Enter Trustor's Name:</label>
                                <input placeholder="eg. Ramesh Kumar" type="text" name="trustors-name"/>
                            </div>
                            <div>
                                <label htmlFor="trustors-fathers-name">Enter Trustor's Fathers Name:</label>
                                <input placeholder="eg. Suresh Kumar" type="text" name="trustors-fathers-name"/>
                            </div>
                            <div>
                                <label htmlFor="trustors-address">Enter Trustor's Address:</label>
                                <input placeholder="eg. 12, Gandhi Street, Chennai, Tamil Nadu, India" type="text" name="trustors-address"/>
                            </div>
                            <div>
                                <label htmlFor="trust-fund-amount">Enter Trust Fund Amount:</label>
                                <input placeholder="eg. ₹10,00,000/-" type="text" name="trust-fund-amount"/>
                            </div>
                            <div>
                                <label htmlFor="trust-fund-amount-in-words">Enter Trust Fund Amount in Words:</label>
                                <input placeholder="eg. Ten Lakh Rupees Only" type="text" name="trust-fund-amount-in-words"/>
                            </div>
                            <div>
                                <label htmlFor="advance-payment-amount">Enter Advance Payment Amount:</label>
                                <input placeholder="eg. ₹10,00,000/-" type="text" name="advance-payment-amount"/>
                            </div>
                            <div>
                                <label htmlFor="trust-address">Enter Trust Address:</label>
                                <input placeholder="eg. 45, MG Road, Bangalore, Karnataka, India" type="text" name="trust-address"/>
                            </div>
                            <div>
                                <label htmlFor="trust-authorities-names">Enter Trust Authoritie's Names:</label>
                                <input placeholder="eg. 1. Anuj Sharma (Chairman), 2. Vinod Sharma (Secretary)" type="text" name="trust-authorities-names"/>
                            </div>
                            <div>
                                <label htmlFor="trust-objectives">Enter Trust Objectives:</label>
                                <input placeholder="eg. Providing free education & healthcare services" type="text" name="trust-objectives"/>
                            </div>
                            <div>
                                <label htmlFor="trust-functions">Enter Trust Functions:</label>
                                <input placeholder="eg. Fundraising, Administration, Welfare Programs" type="text" name="trust-functions"/>
                            </div>
                            <div>
                                <label htmlFor="trust-occupations">Enter Trust Occupations:</label>
                                <input placeholder="eg. Lawyer, Chartered Accountant, Social Worker" type="text" name="trust-occupations"/>
                            </div>
                            <div>
                                <label htmlFor="conditions-of-trustee-removal">Enter Conditions of Trustee Removal:</label>
                                <input placeholder="eg. Ethical misconduct, fraud, or non-participation" type="text" name="conditions-of-trustee-removal"/>
                            </div>
                            <div>
                                <label htmlFor="appointment-of-new-trustees">Enter Appointment of New Trustees:</label>
                                <input placeholder="eg. Elected by majority vote of existing trustees" type="text" name="appointment-of-new-trustees"/>
                            </div>
                            <div>
                                <label htmlFor="trust-administration-details">Enter Trust Administration Details:</label>
                                <input placeholder="eg. Governing rules, legal compliance" type="text" name="trust-administration-details"/>
                            </div>
                            <div>
                                <label htmlFor="trust-meeting-schedule">Enter Trust Meeting Schedule:</label>
                                <input placeholder="eg. Quarterly meetings every 3 months" type="text" name="trust-meeting-schedule"/>
                            </div>
                            <div>
                                <label htmlFor="trust-resolutions-decision-making">Enter Trust Resolutions & Decision-Making:</label>
                                <input placeholder="eg. Unanimous approval for policy changes" type="text" name="trust-resolutions-decision-making"/>
                            </div>
                            <div>
                                <label htmlFor="trust-legal-rights">Enter Trust Legal Rights (Lawsuits, Claims):</label>
                                <input placeholder="eg. Can file & defend cases related to trust affairs" type="text" name="trust-legal-rights"/>
                            </div>
                            <div>
                                <label htmlFor="trust-bank-account-details">Enter Trust Bank Account Details:</label>
                                <input placeholder="eg. SBI Trust Account No: 123456789" type="text" name="trust-bank-account-details"/>
                            </div>
                            <div>
                                <label htmlFor="trust-indemnity-conditions">Enter Trust Indemnity Conditions:</label>
                                <input placeholder="eg. Liability protection for trustees" type="text" name="trust-indemnity-conditions"/>
                            </div>
                            <div>
                                <label htmlFor="trust-activities-operations">Enter Trust Activities & Operations:</label>
                                <input placeholder="eg. Organizing charity events & free medical camps" type="text" name="trust-activities-operations"/>
                            </div>
                            <div>
                                <label htmlFor="trust-dissolution-procedure">Enter Trust Dissolution Procedure:</label>
                                <input placeholder="eg. Requires 75% trustee approval, assets to charity" type="text" name="trust-dissolution-procedure"/>
                            </div>
                            <div>
                                <label htmlFor="trust-fund distribution-proceedings">Enter Trust Fund Distribution & Proceedings:</label>
                                <input placeholder="eg. Assets to be allocated as per dissolution terms" type="text" name="trust-fund distribution-proceedings"/>
                            </div>
                            <div>
                                <label htmlFor="select-language">Select Language To Generate Summary:</label>
                                <select name="select-language" id="select-language">
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </div>
                        </div>
                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default TrustDeed;