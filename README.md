# Truth by Shaun - Frontend

A modern fitness and motivation coaching platform frontend built with HTML, CSS, and JavaScript.

## Features

- 🏋️ Fitness coaching services
- 📞 Phone and FaceTime consultations
- 📋 Comprehensive fitness plans (4, 8, 12 weeks)
- 💳 Secure Stripe payment integration
- 📧 Automated email notifications
- 📱 Responsive design

## Services Offered

### Consultations
- Phone Call - 30 minutes (£30)
- Phone Call - 1 hour (£45)
- FaceTime Mentorship - 30 minutes (£35)
- FaceTime Mentorship - 1 hour (£50)

### Fitness Plans
- THE MY TURN PLAN - 4 Week (£149)
- THE MY TURN PLAN - 8 Week (£199)
- THE MY TURN PLAN - 12 Week (£349)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Payments**: Stripe Checkout
- **Backend**: Firebase Functions (deployed separately)
- **Database**: Cloud Firestore
- **Email**: Nodemailer with Gmail

## Deployment to Render

This is a static frontend that connects to Firebase backend services.

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Deploy Steps

1. **Connect Repository**: Link your GitHub repository to Render
2. **Service Type**: Select "Static Site"
3. **Build Command**: `npm run build`
4. **Publish Directory**: `.` (root directory)
5. **Auto-Deploy**: Enable for automatic deployments

### Environment Setup

No environment variables needed for the frontend. All backend services are handled by Firebase.

### Local Development

```bash
# Install dependencies
npm install

# Start local server
npm start
```

The site will be available at `http://localhost:3000`

## Backend Services

The backend is deployed on Firebase and includes:
- Payment processing with Stripe
- Order management with Firestore
- Email notifications
- Admin dashboard

## File Structure

```
.
├── index.html          # Main landing page
├── success.html        # Payment success page
├── package.json        # Dependencies and scripts
├── Images/            # Media assets
└── README.md          # This file
```

## Support

For technical support or questions, contact: truthbyshaun10@gmail.com

## License

MIT License - see package.json for details