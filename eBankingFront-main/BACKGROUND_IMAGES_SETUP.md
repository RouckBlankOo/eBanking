# Background Images Setup Instructions

## 📁 Required Files

You need to manually save the three image files to your assets/images folder:

### 1. Circle.png

- **Position**: Top right of background
- **Save as**: `c:\Users\Sam\eBankingFront\assets\images\Circle.png`
- **Description**: White circular pattern

### 2. LightBlue.png

- **Position**: Middle right of background
- **Save as**: `c:\Users\Sam\eBankingFront\assets\images\LightBlue.png`
- **Description**: Blue gradient circle

### 3. WhiteShadow.png

- **Position**: Left bottom of background
- **Save as**: `c:\Users\Sam\eBankingFront\assets\images\WhiteShadow.png`
- **Description**: White shadow effect

## 🚀 How to Add the Images

1. **Save each image file** to the `assets/images/` folder with the exact names above
2. **Your OnBoardingScreen** is already configured to use these images
3. **The positioning** is automatically handled:
   - Circle: Top right corner (partially visible)
   - LightBlue: Middle right side
   - WhiteShadow: Bottom left corner (partially visible)

## ✅ What's Already Configured

- **UniversalBackground component** updated with new "banking" variant
- **Image positioning styles** added for perfect placement
- **OnboardingBackground** now uses the banking variant with your images
- **Responsive sizing** based on screen dimensions
- **Proper layering** with content on top

## 🎨 Visual Layout

```
┌─────────────────────────┐
│        [Circle]         │ ← Top Right
│                         │
│              [LightBlue]│ ← Middle Right
│                         │
│                         │
│[WhiteShadow]            │ ← Bottom Left
└─────────────────────────┘
```

## 💡 Usage

Your OnBoardingScreen will automatically show the new background once you save the image files. The images will be:

- **Properly positioned** according to your specifications
- **Responsive** to different screen sizes
- **Layered correctly** behind your content
- **Optimized** for performance

Just save the three PNG files to the assets/images folder and restart your Expo development server!
