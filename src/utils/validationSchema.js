import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

export const getValidationSchema = formType => {
  switch (formType) {
    case 'email':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim())
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
      });

    case 'login':
      return Yup.object().shape({
        email: Yup.string()
          .transform(value => value.trim())
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      });

    case 'signup':
      return Yup.object().shape({
        email: Yup.string()
          .trim()
          .matches(emailRegex, 'Invalid email format')
          .required('Email is required'),
        phone: Yup.string()
          .trim()
          .matches(/^[0-9]{7,15}$/, 'Phone number must be 7 to 15 digits')
          .required('Phone number is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
        agreedToTerms: Yup.boolean().oneOf(
          [true],
          'Please accept Terms of service and Privacy policy',
        ),
      });

    case 'create-client-profile':
      return Yup.object().shape({
        fullName: Yup.string()
          .trim()
          .min(2, 'Full name must be at least 2 characters')
          .required('Full name is required'),
        location: Yup.string()
          .trim()
          .min(2, 'Location must be at least 2 characters')
          .required('Location is required'),
        timeline: Yup.string().trim().required('Timeline is required'),
        budgetRange: Yup.string().trim(),
      });

    case 'create-agent-profile':
      return Yup.object().shape({
        fullName: Yup.string()
          .trim()
          .min(2, 'Full name must be at least 2 characters')
          .required('Full name is required'),
        licenseNumber: Yup.string()
          .trim()
          .min(2, 'License number must be at least 2 characters')
          .required('License number is required'),
        yearsOfExperience: Yup.string()
          .trim()
          .required('Years of experience is required'),
        serviceAreas: Yup.string()
          .trim()
          .min(2, 'Service area is required')
          .required('Service area is required'),
        bio: Yup.string()
          .trim()
          .min(10, 'Bio must be at least 10 characters')
          .required('Bio is required'),
      });

    case 'client-personal-information':
      return Yup.object().shape({
        fullName: Yup.string()
          .trim()
          .min(2, 'Full name must be at least 2 characters')
          .required('Full name is required'),
        location: Yup.string()
          .trim()
          .min(2, 'Location must be at least 2 characters')
          .required('Location is required'),
        timeline: Yup.string().trim().required('Buying timeline is required'),
        budgetRange: Yup.string().trim(),
      });

    case 'reset-pass':
      return Yup.object().shape({
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });

    case 'change-password':
      return Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
          .min(6, 'New password must be at least 6 characters')
          .required('New password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });

    case 'otp':
      return Yup.object().shape({
        otp: Yup.string()
          .length(4, 'OTP must be exactly 4 digits')
          .matches(/^[0-9]{4}$/, 'OTP must be a 4-digit number')
          .required('OTP is required'),
      });
    case 'reciepient-baby-profile1':
      return Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        dob: Yup.string().required('Date of birth is required'),
        allergies: Yup.string(),
        medicalConcerns: Yup.string(),
      });
    case 'reciepient-baby-profile2':
      return Yup.object().shape({
        longTerm: Yup.boolean().required('Long Term is required'),
        shortTerm: Yup.string().required('Short Term of birth is required'),
        emergency: Yup.string().required('Emergency of birth is required'),
        oneTimeTrial: Yup.string().required('Dietary Need is required'),
      });

    case 'profile-step-one':
      return Yup.object().shape({
        babyName: Yup.string()
          .trim()
          .min(2, 'Baby name must be at least 2 characters')
          .max(50, 'Baby name cannot exceed 50 characters')
          .matches(
            /^[a-zA-Z\s]+$/,
            'Baby name can only contain letters and spaces',
          )
          .required('Baby name is required'),

        dateOfBirth: Yup.string().required('Date of birth is required'),

        birthType: Yup.string()
          .oneOf(
            ['Vaginal', 'C-Section', 'VBAC'],
            'Please select a valid birth type',
          )
          .required('Birth type is required'),

        allergies: Yup.string()
          .oneOf(
            ['None', 'Dairy, Nuts', 'Gluten', 'Shellfish', 'Other'],
            'Please select a valid allergy option',
          )
          .required('Allergies information is required'),

        babyPhoto: Yup.mixed()
          .nullable()
          .test('fileSize', 'File size is too large', value => {
            if (!value) return true; // Allow null/undefined
            return value.fileSize ? value.fileSize <= 5000000 : true; // 5MB limit
          })
          .test('fileType', 'Unsupported file format', value => {
            if (!value) return true; // Allow null/undefined
            return value.type ? value.type.startsWith('image/') : true;
          }),

        hasBreastfedBefore: Yup.boolean().required(
          'Please specify if you have breastfed before',
        ),

        // Conditional validations for breastfeeding experience
        breastfeedingDuration: Yup.string().when('hasBreastfedBefore', {
          is: true,
          then: schema =>
            schema
              .oneOf(
                [
                  '1 Month',
                  '2 Months',
                  '3 Months',
                  '6 Months',
                  '9 Months',
                  '12 Months',
                  '18+ Months',
                ],
                'Please select a valid duration',
              )
              .required('Breastfeeding duration is required'),
          otherwise: schema => schema.notRequired(),
        }),

        currentlyExclusivelyBreastfeeding: Yup.boolean().when(
          'hasBreastfedBefore',
          {
            is: true,
            then: schema =>
              schema.required(
                'Please specify if you are currently exclusively breastfeeding',
              ),
            otherwise: schema => schema.notRequired(),
          },
        ),

        pumpRegularly: Yup.boolean().when('hasBreastfedBefore', {
          is: true,
          then: schema =>
            schema.required('Please specify if you pump regularly'),
          otherwise: schema => schema.notRequired(),
        }),

        dailyExpressOunces: Yup.string().when('hasBreastfedBefore', {
          is: true,
          then: schema =>
            schema
              .oneOf(
                ['5', '10', '15', '20', '25', '30'],
                'Please select a valid amount',
              )
              .required('Daily express amount is required'),
          otherwise: schema => schema.notRequired(),
        }),

        experienceDonatingSelling: Yup.boolean().when('hasBreastfedBefore', {
          is: true,
          then: schema =>
            schema.required(
              'Please specify if you have experience donating/selling',
            ),
          otherwise: schema => schema.notRequired(),
        }),

        facedLactationIssues: Yup.boolean().when('hasBreastfedBefore', {
          is: true,
          then: schema =>
            schema.required(
              'Please specify if you have faced lactation issues',
            ),
          otherwise: schema => schema.notRequired(),
        }),

        lactationIssuesType: Yup.string().when(
          ['hasBreastfedBefore', 'facedLactationIssues'],
          {
            is: (hasBreastfed, facedIssues) => hasBreastfed && facedIssues,
            then: schema =>
              schema
                .oneOf(
                  [
                    'Mastitis',
                    'Low Supply',
                    'Engorgement',
                    'Cracked Nipples',
                    'Blocked Ducts',
                    'Other',
                  ],
                  'Please select a valid issue type',
                )
                .required('Lactation issue type is required'),
            otherwise: schema => schema.notRequired(),
          },
        ),

        additionalNotes: Yup.string()
          .max(500, 'Additional notes cannot exceed 500 characters')
          .nullable(),
      });

    case 'profile-step-three':
      return Yup.object().shape({
        sharingType: Yup.string()
          .oneOf(
            ['Donate', 'Sell My Milk'],
            'Please select a valid sharing type',
          )
          .required('Sharing type is required'),

        // Conditional validation for price per oz when selling
        pricePerOz: Yup.string().when('sharingType', {
          is: 'Sell My Milk',
          then: schema =>
            schema
              .matches(
                /^\d+(\.\d{1,2})?$/,
                'Please enter a valid price (e.g., 2.50)',
              )
              .test('min-price', 'Price must be greater than 0', value => {
                return value ? parseFloat(value) > 0 : false;
              })
              .test('max-price', 'Price cannot exceed $50.00', value => {
                return value ? parseFloat(value) <= 50 : true;
              })
              .required('Price per oz is required when selling'),
          otherwise: schema => schema.notRequired(),
        }),

        // Conditional validation for payment method when selling
        paymentMethod: Yup.string().when('sharingType', {
          is: 'Sell My Milk',
          then: schema =>
            schema
              .oneOf(
                ['Stripe', 'PayPal', 'Cash', 'Bank Transfer', 'Venmo'],
                'Please select a valid payment method',
              )
              .required('Payment method is required when selling'),
          otherwise: schema => schema.notRequired(),
        }),
      });

    case 'profile-step-four':
      return Yup.object().shape({
        lifestyleMedication: Yup.string(),
        bloodTestReport: Yup.string().required('Blood Test Report is required'),
        vaccinationRecord: Yup.string().required(
          'Vaccination Record is required',
        ),
        obGynNote: Yup.string(),
      });

    case 'donor-sell-add-listing':
      return Yup.object().shape({
        quantityOz: Yup.number()
          .required('Quantity in oz is required')
          .min(1, 'Minimum quantity is 1 oz'),
        fromDate: Yup.string().required('From date is required'),
        toDate: Yup.string().required('To date is required'),
        storageMethod: Yup.string(),
        milkType: Yup.string(),
        pricePerOz: Yup.number()
          .required('Price per oz is required')
          .min(0.01, 'Price must be greater than 0'),
        paymentMethod: Yup.string().required('Payment method is required'),
        pickupOrDelivery: Yup.string().required(
          'Pickup or Delivery is required',
        ),
        expirationDate: Yup.string().required('Expiration date is required'),
        nextAvailability: Yup.string(),
      });

    case 'change-list-price':
      return Yup.object().shape({
        pricePerOz: Yup.number()
          .required('Price per oz is required')
          .min(0.01, 'Price must be greater than 0'),
        paymentMethod: Yup.string().required('Payment method is required'),
      });

    case 'request-form':
      return Yup.object().shape({
        quantity: Yup.number().required('Quantity is required'),
        deliveryMethod: Yup.string().required('Delivery method is required'),
        message: Yup.string().max(500, 'Message cannot exceed 500 characters'),
      });

    case 'review':
      return Yup.object().shape({
        stars: Yup.number()
          .min(1, 'Please provide a star rating')
          .max(5, 'Rating cannot exceed 5 stars')
          .required('Star rating is required'),
        review: Yup.string()
          .trim()
          .min(10, 'Review must be at least 10 characters')
          .max(500, 'Review cannot exceed 500 characters')
          .required('Review is required'),
      });

    case 'payment':
      return Yup.object().shape({
        cardHolder: Yup.string()
          .trim()
          .min(2, 'Card holder name must be at least 2 characters')
          .required('Card holder name is required'),
        cardNumber: Yup.string()
          .test('card-length', 'Card number must be 16 digits', val =>
            val ? val.replace(/\s/g, '').length === 16 : false,
          )
          .required('Card number is required'),
        expiry: Yup.string()
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter a valid expiry date (MM/YY)')
          .required('Expiry date is required'),
        cvv: Yup.string()
          .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
          .required('CVV is required'),
      });

    default:
      return Yup.object();
  }
};
