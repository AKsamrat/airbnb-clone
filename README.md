# 🏡 Airbnb Clone

A full-featured Airbnb clone built with modern web technologies, offering property listings, bookings, and user management functionality.

## 🌟 Features

- **Property Listings**: Browse and search through available properties
- **User Authentication**: Secure login and registration system
- **Property Management**: Host properties with detailed information and images
- **Booking System**: Reserve properties for specific dates
- **Favorites**: Save properties to your wishlist
- **Responsive Design**: Fully responsive across all devices
- **Interactive Map**: Location-based property search
- **Reviews & Ratings**: User feedback and rating system
- **Advanced Filters**: Search by location, price, amenities, and more

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **NextAuth.js** - Authentication

### Additional Tools

- **Cloudinary** - Image hosting and optimization
- **React Leaflet** - Interactive maps
- **Date-fns** - Date manipulation
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** / **yarn** / **pnpm** / **bun**
- **MongoDB** database (local or cloud)
- **Git**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AKsamrat/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="your_mongodb_connection_string"

   # NextAuth
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (Optional)
   GITHUB_ID="your_github_oauth_id"
   GITHUB_SECRET="your_github_oauth_secret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   ```

4. **Set up Prisma**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
airbnb-clone/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── actions/           # Server actions
│   ├── hooks/             # Custom React hooks
│   ├── libs/              # Utility libraries
│   └── types/             # TypeScript types
├──
├── public/                # Static assets
├── .env                   # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Usage

### For Guests

1. **Sign up or log in** to your account
2. **Browse properties** using filters and search
3. **View property details** including photos, amenities, and reviews
4. **Select dates** and make a reservation
5. **Manage your bookings** from your dashboard

### For Hosts

1. **Create an account** and become a host
2. **List your property** with photos and details
3. **Set pricing and availability** for your listing
4. **Manage reservations** and communicate with guests
5. **Track your earnings** through the dashboard

## 🔧 Configuration

### Database Setup

The project uses Prisma with MongoDB. Update your `DATABASE_URL` in the `.env` file with your MongoDB connection string.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**AKsamrat**

- GitHub: [@AKsamrat](https://github.com/AKsamrat)

## 🙏 Acknowledgments

- Design inspiration from [Airbnb](https://www.airbnb.com)
- Next.js team for the amazing framework
- All contributors who help improve this project

## 📧 Contact

If you have any questions or suggestions, feel free to reach out or open an issue!

---

⭐ If you found this project helpful, please give it a star on GitHub!
