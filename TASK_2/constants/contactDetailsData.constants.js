export const INVALID_CONTACT_DETAILS = {
    firstName: '!@#',
    lastName: 'Hello1',
    email: 'invalidemail.com',
    phone: 'InvalidPhoneNumber',
    postalCode: 'InvalidPostalCode',
    comments: 'RandomComment',
}

export const CONTACT_DETAILS_ERROR_MESSAGES = {
    firstName: 'Please avoid the following characters: 0123456789/*+=;:,!?[](){}#',
    lastName: 'Please avoid the following characters: 0123456789/*+=;:,!?[](){}#',
    email: 'Please enter a valid email address using a minimum of six characters.',
    phone: 'Please enter a valid mobile number (Example: 0441234567)',
    postalCode: 'Please enter a valid post code.',
    incorrectData: 'Please check the data you entered.'

}