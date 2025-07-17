# Reusable More Options Components

This document describes the reusable components created for the "More" options modal functionality in the eBanking application.

## Components Overview

### 1. MoreOptionsModal

A fully reusable, swipe-to-dismiss modal component that can be used throughout the application for displaying action options.

**Location**: `components/MoreOptionsModal.tsx`

**Features**:

- ✅ Swipe-to-dismiss functionality using PanResponder
- ✅ Smooth animations with spring physics
- ✅ BlurView background with custom backdrop
- ✅ Professional gradient design
- ✅ Support for custom icons (Ionicons) and image sources
- ✅ Automatic separation between normal and danger actions
- ✅ Customizable header with icon, title, and subtitle
- ✅ TypeScript interface for type safety

**Props**:

```typescript
interface MoreOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  options: MoreOption[];
  title?: string; // Default: "More Options"
  subtitle?: string; // Default: "Choose an action"
  headerIcon?: string; // Default: "ellipsis-horizontal"
  headerIconColor?: string; // Default: "#3B82F6"
}
```

**MoreOption Interface**:

```typescript
interface MoreOption {
  id: string;
  title: string;
  description: string;
  icon: string; // Ionicon name
  iconSource?: ImageSourcePropType; // Alternative: custom image
  gradient: [string, string, ...string[]];
  onPress: () => void;
  isDanger?: boolean; // Adds red styling and separator
}
```

### 2. MoreButton

A reusable button component that provides consistent styling for the "More" action button.

**Location**: `components/MoreButton.tsx`

**Features**:

- ✅ Consistent gradient styling
- ✅ Shadow effects
- ✅ Customizable styles
- ✅ Uses the same More icon across the app

**Props**:

```typescript
interface MoreButtonProps {
  onPress: () => void;
  style?: any; // Override container styles
  iconStyle?: any; // Override icon container styles
  textStyle?: any; // Override text styles
}
```

## Usage Examples

### CardsScreen Implementation

```tsx
import MoreOptionsModal, { MoreOption } from "../components/MoreOptionsModal";
import MoreButton from "../components/MoreButton";

// Define card-specific options
const cardMoreOptions: MoreOption[] = [
  {
    id: "change-name",
    title: "Change Name",
    description: "Customize your card display name",
    icon: "create-outline",
    gradient: ["#3B82F6", "#1D4ED8"],
    onPress: handleChangeName,
  },
  {
    id: "edit-design",
    title: "Edit Card Design",
    description: "Personalize your card appearance",
    icon: "color-palette-outline",
    gradient: ["#8B5CF6", "#7C3AED"],
    onPress: handleEditCardDesign,
  },
  {
    id: "delete-card",
    title: "Delete Card",
    description: "Permanently remove this card",
    icon: "trash-outline",
    gradient: ["#EF4444", "#DC2626"],
    onPress: handleDeleteCard,
    isDanger: true,
  },
];

// Use the components
<MoreButton onPress={() => setMoreModalVisible(true)} />

<MoreOptionsModal
  visible={moreModalVisible}
  onClose={() => setMoreModalVisible(false)}
  options={cardMoreOptions}
  title="Card Options"
  subtitle="Manage your card settings"
  headerIcon="card"
  headerIconColor="#3B82F6"
/>
```

### HomeScreen Implementation

```tsx
import MoreOptionsModal, { MoreOption } from "../components/MoreOptionsModal";

// Define home-specific options
const homeMoreOptions: MoreOption[] = [
  {
    id: "convert",
    title: "Convert",
    description: "Exchange between currencies",
    icon: "swap-horizontal-outline",
    iconSource: require("@/assets/Icons/Convert.png"),
    gradient: ["#10B981", "#059669"],
    onPress: () => handleCardAction("convert"),
  },
  {
    id: "withdraw",
    title: "Withdraw",
    description: "Transfer funds to your bank",
    icon: "arrow-up-outline",
    iconSource: require("@/assets/Icons/Withdraw.png"),
    gradient: ["#F59E0B", "#D97706"],
    onPress: () => handleCardAction("withdraw"),
  },
  // ... more options
];

// Use the modal (HomeScreen uses ActionButton for consistency)
<MoreOptionsModal
  visible={moreOptionsModalVisible}
  onClose={() => setMoreOptionsModalVisible(false)}
  options={homeMoreOptions}
  title="Quick Actions"
  subtitle="Choose an action to perform"
  headerIcon="ellipsis-horizontal"
  headerIconColor="#3B82F6"
/>;
```

## Customization Guidelines

### Adding New Options

1. Create a new `MoreOption` object with the required properties
2. Choose appropriate gradient colors that match your action type
3. Use descriptive title and description text
4. Set `isDanger: true` for destructive actions (deletes, etc.)

### Gradient Color Schemes

- **Primary Actions**: `["#3B82F6", "#1D4ED8"]` (Blue)
- **Creative Actions**: `["#8B5CF6", "#7C3AED"]` (Purple)
- **Success Actions**: `["#10B981", "#059669"]` (Green)
- **Warning Actions**: `["#F59E0B", "#D97706"]` (Orange)
- **Danger Actions**: `["#EF4444", "#DC2626"]` (Red)

### Icon Options

You can use either:

- **Ionicons**: Specify the icon name in the `icon` property
- **Custom Images**: Provide an `iconSource` property with `require()` statement

### Modal Customization

- Customize the header with different icons and colors
- Adjust title and subtitle text
- The modal automatically handles layout and animations

## Migration from Old Components

The new `MoreOptionsModal` replaces:

- ❌ `CardMoreOptionsModal.tsx` (removed)
- ❌ `HomeMoreOptionsModal.tsx` (removed)

### Breaking Changes

- Props interface changed from individual action callbacks to options array
- Header customization now uses props instead of hardcoded values
- Icon handling supports both Ionicons and custom images

## Technical Details

### Animation System

- Uses `Animated.Value` for smooth transitions
- PanResponder handles swipe gestures with velocity thresholds
- Spring physics for natural bounce-back behavior
- Parallel animations for fade and slide effects

### Accessibility

- Supports `onRequestClose` for Android back button
- Touch targets meet minimum size requirements
- Color contrast meets accessibility guidelines

### Performance

- Optimized with `useNativeDriver: true` for 60fps animations
- Efficient gesture handling with proper threshold detection
- Memory-efficient component lifecycle management

## Future Enhancements

Potential improvements for future versions:

- [ ] Haptic feedback on swipe gestures
- [ ] Custom animation curves
- [ ] Keyboard navigation support
- [ ] Voice-over accessibility labels
- [ ] Theme system integration
- [ ] Dynamic icon size based on content
