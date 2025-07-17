import { Platform } from 'react-native';

// Performance configuration for the app
export const PerformanceConfig = {
  // Animation durations
  FAST_ANIMATION: 200,
  NORMAL_ANIMATION: 300,
  SLOW_ANIMATION: 500,
  
  // FlatList optimization settings
  FLATLIST_OPTIMIZATION: {
    removeClippedSubviews: true,
    maxToRenderPerBatch: Platform.OS === 'ios' ? 10 : 5,
    initialNumToRender: Platform.OS === 'ios' ? 10 : 5,
    windowSize: Platform.OS === 'ios' ? 10 : 5,
    updateCellsBatchingPeriod: 50,
    getItemLayout: null, // Define per component
  },
  
  // ScrollView optimization settings
  SCROLLVIEW_OPTIMIZATION: {
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    keyboardShouldPersistTaps: 'handled',
  },
  
  // Image optimization settings
  IMAGE_OPTIMIZATION: {
    resizeMode: 'contain',
    fadeDuration: Platform.OS === 'android' ? 0 : 300,
  },
};

// Performance monitoring utilities
export const PerformanceUtils = {
  // Debounce function for search inputs
  debounce: (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function for scroll events
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Measure component render time (development only)
  measureRenderTime: (componentName: string) => {
    if (__DEV__) {
      const startTime = Date.now();
      return () => {
        const endTime = Date.now();
        console.log(`${componentName} render time: ${endTime - startTime}ms`);
      };
    }
    return () => {};
  },
};

// Navigation transition presets
export const TransitionPresets = {
  // Fast slide transition
  FastSlide: {
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    transitionSpec: {
      open: {
        animation: 'timing' as const,
        config: {
          duration: PerformanceConfig.FAST_ANIMATION,
        },
      },
      close: {
        animation: 'timing' as const,
        config: {
          duration: PerformanceConfig.FAST_ANIMATION,
        },
      },
    },
  },
  
  // Modal transition
  Modal: {
    gestureEnabled: true,
    gestureDirection: 'vertical' as const,
    transitionSpec: {
      open: {
        animation: 'timing' as const,
        config: {
          duration: PerformanceConfig.NORMAL_ANIMATION,
        },
      },
      close: {
        animation: 'timing' as const,
        config: {
          duration: PerformanceConfig.FAST_ANIMATION,
        },
      },
    },
  },
};
