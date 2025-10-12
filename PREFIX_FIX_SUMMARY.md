# Slug Prefix Fix Summary

## ❌ **Problem**
- `/coche/bmw_x5` worked but other slugs failed with 404 to `/api/car-detail?idOrSlug=slug-...`
- Suspected issue: Code accidentally adding "slug-" prefix to API calls

## ✅ **Solution Applied**

### 1. **Robust API Prefix Cleaning** (`/api/car-detail.mjs`)
```javascript
// Clean any accidental prefixes and normalize
raw = String(raw).trim().toLowerCase()
  .replace(/^slug-/, '')     // Remove "slug-" prefix
  .replace(/^car-/, '')      // Remove "car-" prefix  
  .replace(/^coche-/, '');   // Remove "coche-" prefix
```

### 2. **Enhanced Error Reporting**
```javascript
return res.status(404).json({ 
  error: "Car not found", 
  searched: param,
  type: isId ? 'id' : 'slug'
});
```

### 3. **Verified Clean Links**
✅ **CarPreview.tsx**: `to={/coche/${car.slug || toCarSlug(car.brand, car.model)}}`
✅ **Stock.tsx**: `to={/coche/${car.slug || toCarSlug(car.brand, car.model)}}`
✅ **CarDetail.tsx**: `fetch(/api/car-detail?idOrSlug=${encodeURIComponent(param)})`

## 🔄 **API Behavior**

| Input | Cleaned To | Type | Action |
|-------|------------|------|--------|
| `bmw_x5` | `bmw_x5` | slug | ✅ Find by slug |
| `slug-porsche_gt3` | `porsche_gt3` | slug | ✅ Find by slug |
| `car-audi_a4` | `audi_a4` | slug | ✅ Find by slug |
| `13` | `13` | id | ✅ Find by ID |

## 🎯 **Key Changes**

1. **API Tolerance**: Handles accidental prefixes gracefully
2. **Clean Links**: All car cards use pure slugs without prefixes
3. **Better Debugging**: Enhanced error messages with search details
4. **Robust Normalization**: Handles multiple prefix patterns

## 🚀 **Expected Results**

- ✅ `/coche/porsche_gt3` → Should load directly
- ✅ `/coche/bmw_m3` → Should load directly  
- ✅ `/coche/13` → Should redirect to `/coche/bmw_x5`
- ✅ All stock cards → Navigate to clean slug URLs

The API now tolerates any accidental prefixes while maintaining clean, SEO-friendly URLs throughout the application.

**Committed**: `fix(detail): quitar prefijo 'slug-' en fetch y API tolerante; enlaces por slug en todas las cards`