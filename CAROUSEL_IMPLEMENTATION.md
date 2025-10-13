# Multi-Image Carousel Implementation Summary

## ✅ **What Was Implemented**

### 1. **Type Updates** (`src/lib/api.ts`)
- Updated `Car.imageUrl` type from `string` to `string | string[]`
- Supports both single images and arrays of images

### 2. **Image Normalization Helper** (`src/lib/normalizeImages.ts`)
```typescript
export function normalizeImages(image_url: string | string[] | null | undefined): string[]
```
- Handles `null/undefined` → returns `[]`
- Handles `string[]` → filters out empty values
- Handles `string` → parses JSON arrays or returns single URL
- Example inputs:
  - `"https://example.com/car.jpg"` → `["https://example.com/car.jpg"]`
  - `'["url1","url2"]'` → `["url1","url2"]`
  - `["url1","url2"]` → `["url1","url2"]`

### 3. **ImageCarousel Component** (`src/components/car/ImageCarousel.tsx`)
**Features:**
- **Single Image**: Displays normally if `images.length <= 1`
- **Multi-Image Carousel**: Full carousel for multiple images
- **Navigation**: Arrow buttons (left/right) with hover effects
- **Counter Badge**: Shows "1/3" format in bottom-right corner
- **Keyboard Support**: Left/Right arrow keys for navigation
- **Smooth Transitions**: CSS transforms with duration-300 ease-out
- **Responsive**: Maintains same dimensions as original (h-96, rounded-2xl)
- **Accessibility**: Proper ARIA labels and semantic structure

**Styling:**
- Matches existing design (rounded corners, black/40 overlay buttons)
- Same dimensions and container style as original image
- Counter badge uses same styling as savings badge

### 4. **Integration Updates**

**CarDetail.tsx:**
- Replaced old carousel logic with new `ImageCarousel` component
- Removed unused carousel state (`idx`, `goPrev`, `goNext`)
- Removed unused imports (`ChevronLeft`, `ChevronRight`)
- Maintains all existing badges (year, status, savings) overlaid on carousel
- Uses existing `toImageArray` function for compatibility

**Stock.tsx & CarPreview.tsx:**
- Updated to use `normalizeImages()` helper
- Takes first image only: `const img = images.length > 0 ? images[0] : brandFallback(car.brand)`
- Maintains exact same visual appearance in listing views

## 🎯 **Behavior Examples**

### Database Value → UI Result

| `cars.image_url` | Normalized Result | CarDetail Display | Stock/Preview Display |
|------------------|-------------------|-------------------|----------------------|
| `"https://example.com/bmw.jpg"` | `["https://example.com/bmw.jpg"]` | Single image | Single image |
| `["url1","url2","url3"]` | `["url1","url2","url3"]` | **Carousel** with nav | First image only |
| `'["url1","url2"]'` | `["url1","url2"]` | **Carousel** with nav | First image only |
| `null` | `[]` | Fallback image | Brand fallback |
| `""` | `[]` | Fallback image | Brand fallback |

## 🔄 **User Experience**

### Single Image (Current Behavior)
- No change from current experience
- Static image display

### Multiple Images (New Feature)
- **Navigation**: Click left/right arrows or use keyboard
- **Visual Feedback**: Smooth transitions between images
- **Progress**: Counter shows "2/5" etc.
- **Responsive**: Works on mobile and desktop
- **Accessibility**: Screen reader friendly

## 🚀 **No Breaking Changes**

- ✅ All existing single-image cars work unchanged
- ✅ Existing database values supported
- ✅ Same visual styling and dimensions
- ✅ Stock/preview cards unchanged (show first image)
- ✅ All existing functionality preserved
- ✅ No new dependencies added

## 🧪 **Testing Scenarios**

To test the carousel, update a car's `image_url` in the database:

```sql
-- Single image (current behavior)
UPDATE cars SET image_url = 'https://example.com/bmw.jpg' WHERE id = 1;

-- Multiple images (new carousel)
UPDATE cars SET image_url = '["https://example.com/bmw1.jpg","https://example.com/bmw2.jpg","https://example.com/bmw3.jpg"]' WHERE id = 1;
```

Then visit `/coche/{slug}` to see the carousel in action.

**Committed**: `feat(images): carrusel multi-imagen para detalle de coche + normalizeImages helper`