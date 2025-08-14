# Google Maps API Setup Guide

Follow these steps to get your Google Maps API key and integrate it into the healthcare management system:

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" at the top of the page
4. Click "New Project"
5. Enter a project name (e.g., "Healthcare Management System")
6. Click "Create"

## Step 2: Enable the Maps JavaScript API

1. In the Google Cloud Console, make sure your project is selected
2. Go to the [APIs & Services Dashboard](https://console.cloud.google.com/apis/dashboard)
3. Click "Enable APIs and Services"
4. Search for "Maps JavaScript API"
5. Click on "Maps JavaScript API" from the results
6. Click "Enable"

## Step 3: Create API Credentials

1. Go to the [Credentials page](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Your API key will be created and displayed
4. **Important**: Copy this key immediately and store it securely

## Step 4: Restrict Your API Key (Recommended for Security)

1. Click on the API key you just created
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domain (e.g., `localhost:5173/*` for development)
   - Add your production domain when deploying
3. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Maps JavaScript API"
4. Click "Save"

## Step 5: Set Up Billing (Required)

1. Go to the [Billing page](https://console.cloud.google.com/billing)
2. Link a billing account to your project
3. **Note**: Google provides $200 in free credits monthly for Maps API usage
4. Most applications stay within the free tier limits

## Step 6: Add API Key to Your Project

1. Open the `.env` file in your project root
2. Replace `your_google_maps_api_key_here` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file
4. Restart your development server (`npm run dev`)

## Step 7: Test the Integration

1. Start your application
2. Navigate to the Ambulance Driver Dashboard
3. You should see a live Google Map with your current location
4. Navigate to the Hospital Admin Dashboard
5. The "Live Ambulance Tracking" section should display a map with ambulance markers

## API Usage and Pricing

- **Free Tier**: $200 credit per month (covers ~28,000 map loads)
- **Pay-as-you-go**: $7 per 1,000 map loads after free tier
- **Dynamic Maps**: $7 per 1,000 loads
- **Static Maps**: $2 per 1,000 loads

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use HTTP referrer restrictions** for web applications
3. **Monitor API usage** in Google Cloud Console
4. **Set up billing alerts** to avoid unexpected charges
5. **Rotate API keys** periodically

## Troubleshooting

### Common Issues:

1. **"This page can't load Google Maps correctly"**
   - Check if billing is enabled
   - Verify API key is correct
   - Ensure Maps JavaScript API is enabled

2. **"RefererNotAllowedMapError"**
   - Add your domain to HTTP referrer restrictions
   - For development, add `localhost:5173/*`

3. **Map not loading**
   - Check browser console for errors
   - Verify `.env` file is properly configured
   - Restart development server after adding API key

### Testing Your Setup:

1. Open browser developer tools (F12)
2. Check the Console tab for any Google Maps errors
3. Verify the API key is being loaded correctly
4. Test on different devices and browsers

## Additional Features Available

With your Google Maps API key, you can also enable:

- **Places API**: For address autocomplete
- **Directions API**: For route planning
- **Distance Matrix API**: For calculating travel times
- **Geocoding API**: For converting addresses to coordinates

To enable these, go back to the APIs & Services Dashboard and enable the additional APIs as needed.

## Production Deployment

When deploying to production:

1. Update HTTP referrer restrictions with your production domain
2. Consider using separate API keys for development and production
3. Monitor usage and set up billing alerts
4. Implement proper error handling for API failures

## Support

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Support](https://cloud.google.com/support)
- [Stack Overflow - Google Maps](https://stackoverflow.com/questions/tagged/google-maps)