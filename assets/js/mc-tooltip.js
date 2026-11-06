/**
 * LunarChill - Minecraft Inventory & Recipe Tooltip Engine
 * Faithful recreation of Minecraft in-game GUI tooltip & slot hover behavior.
 * Clean white slot highlight on item texture/slot only; no tooltip on pure text.
 * Zero external dependencies. High performance event delegation.
 */
(function() {
  'use strict';

  // 1. Create single persistent tooltip container
  const tooltip = document.createElement('div');
  tooltip.id = 'mc-tooltip';
  tooltip.className = 'mc-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tooltip);

  let activeTarget = null;

  // 2. Clean item name formatter (strips quantities, brackets, and helper prefixes)
  function cleanItemName(raw) {
    if (!raw) return '';
    let name = raw.trim();

    // Remove leading quantity: "1x ", "2x ", "4x ", "64x ", etc.
    name = name.replace(/^\d+x\s+/i, '');

    // Remove common prefixes
    name = name.replace(/^(Khiên 3D|Trứng sinh|Chìa khóa|Ngọc|Cá|Quả|Nỏ|Kiếm|Cần câu|Vòng cổ|Bình|Bình thuốc|Món)\s+/i, '');

    // If string has format "Canonical Name (Vietnamese Description)", extract canonical name
    // e.g. "Enderman's Flesh (Thịt Enderman Sống)" -> "Enderman's Flesh"
    // e.g. "Iron Block (Khối Sắt)" -> "Iron Block"
    // e.g. "Bottle o' Enchanting (Chai Kinh Nghiệm)" -> "Bottle o' Enchanting"
    const parenMatch = name.match(/^([^(]+)\s*\([^)]*\)$/);
    if (parenMatch && parenMatch[1].trim().length >= 2) {
      name = parenMatch[1].trim();
    }

    // Remove leading bullet/dash/plus
    name = name.replace(/^[•\-\+]\s*/, '').trim();

    return name;
  }

  // 3. Resolve item name for any crafting/recipe element
  function resolveItemName(el) {
    if (!el) return '';

    // Ignore text steps, condition chips, or general paragraph text
    if (el.classList.contains('recipe-step-text') || el.closest('.recipe-step-text')) {
      return '';
    }

    // Direct data attribute override (only if explicitly set on the element)
    if (el.dataset && el.dataset.mcTooltip) {
      return el.dataset.mcTooltip.trim();
    }

    // Finished crafted item box (.item-sprite-box)
    if (el.classList.contains('item-sprite-box') || el.closest('.item-sprite-box')) {
      const box = el.classList.contains('item-sprite-box') ? el : el.closest('.item-sprite-box');
      if (box.dataset && box.dataset.mcTooltip) {
        return box.dataset.mcTooltip.trim();
      }
      const card = box.closest('.item-recipe-card');
      if (card) {
        const titleEl = card.querySelector('.item-meta-title');
        if (titleEl && titleEl.textContent.trim()) {
          return cleanItemName(titleEl.textContent);
        }
      }
      const img = box.querySelector('img');
      if (img && img.alt) {
        return cleanItemName(img.alt);
      }
      return '';
    }

    // Recipe ingredient (.recipe-ing)
    if (el.classList.contains('recipe-ing') || el.closest('.recipe-ing')) {
      const ing = el.classList.contains('recipe-ing') ? el : el.closest('.recipe-ing');

      // Rule: Do NOT show tooltip for pure text ingredients/steps without icon
      const img = ing.querySelector('img');
      if (!img && (!ing.dataset || !ing.dataset.mcTooltip)) {
        return '';
      }

      // Check explicit data attribute on ing
      if (ing.dataset && ing.dataset.mcTooltip) {
        return ing.dataset.mcTooltip.trim();
      }

      // Check img alt inside ingredient
      if (img && img.alt) {
        const altClean = cleanItemName(img.alt);
        if (altClean && altClean.length >= 2 && !altClean.includes('Heart')) {
          return altClean;
        }
      }

      return '';
    }

    // Void Pendant 9-Variant Card
    if (el.classList.contains('pendant-variant-card') || el.closest('.pendant-variant-card')) {
      const card = el.classList.contains('pendant-variant-card') ? el : el.closest('.pendant-variant-card');
      const title = card.querySelector('.pendant-variant-title');
      if (title) return cleanItemName(title.textContent);
    }

    // Radiant Jewel 5-Buff Card
    if (el.classList.contains('jewel-buff-card') || el.closest('.jewel-buff-card')) {
      const card = el.classList.contains('jewel-buff-card') ? el : el.closest('.jewel-buff-card');
      const title = card.querySelector('.jewel-buff-title');
      if (title) return cleanItemName(title.textContent);
    }

    // Direct Image in recipe area with alt
    if (el.tagName === 'IMG' && el.alt && el.closest('.recipe-frame-box, .item-recipe-card')) {
      return cleanItemName(el.alt);
    }

    return '';
  }

  // 4. Update tooltip position near cursor with viewport boundary checking
  function updateTooltipPosition(e) {
    const pad = 12;
    const rect = tooltip.getBoundingClientRect();
    const tipWidth = rect.width || 120;
    const tipHeight = rect.height || 26;

    // Standard Minecraft offset: slightly above and to the right of cursor
    let x = e.clientX + 14;
    let y = e.clientY - tipHeight - 6;

    // Clamp right boundary (flip to left of cursor if overflows right edge)
    if (x + tipWidth > window.innerWidth - pad) {
      x = e.clientX - tipWidth - 10;
    }

    // Clamp top boundary (flip below cursor if overflows top edge)
    if (y < pad) {
      y = e.clientY + 22;
    }

    // Clamp bottom boundary
    if (y + tipHeight > window.innerHeight - pad) {
      y = window.innerHeight - tipHeight - pad;
    }

    // Clamp left boundary
    if (x < pad) {
      x = pad;
    }

    tooltip.style.left = Math.round(x) + 'px';
    tooltip.style.top = Math.round(y) + 'px';
  }

  // Mark ingredient elements that have item icons with class 'has-icon'
  function markIconIngredients() {
    document.querySelectorAll('.recipe-ing').forEach(function(el) {
      if (el.querySelector('img')) {
        el.classList.add('has-icon');
      } else {
        el.classList.remove('has-icon');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markIconIngredients);
  } else {
    markIconIngredients();
  }

  // 5. Global event delegation
  document.addEventListener('mouseover', function(e) {
    // Immediately ignore text steps, condition chips, headers, notes, item meta text
    if (e.target.closest('.recipe-step-text, .recipe-note, .recipe-station-header, .item-meta')) {
      return;
    }

    // Only inspect genuine item slot targets
    const target = e.target.closest('.item-sprite-box, .recipe-ing.mc-slot, .recipe-ing.has-icon, .pendant-variant-card, .jewel-buff-card, [data-mc-tooltip]');
    if (!target) return;

    // Strictly reject text-only elements (must have an image icon or explicit data-mc-tooltip)
    if (!target.querySelector('img') && (!target.dataset || !target.dataset.mcTooltip)) {
      return;
    }

    const itemName = resolveItemName(target);
    if (!itemName) return;

    activeTarget = target;
    tooltip.textContent = itemName;
    tooltip.classList.add('is-visible');
    target.classList.add('mc-slot-hover');
    updateTooltipPosition(e);
  });

  document.addEventListener('mousemove', function(e) {
    if (!activeTarget) return;
    updateTooltipPosition(e);
  });

  document.addEventListener('mouseout', function(e) {
    if (!activeTarget) return;

    const related = e.relatedTarget;
    if (related && activeTarget.contains(related)) {
      return;
    }

    activeTarget.classList.remove('mc-slot-hover');
    activeTarget = null;
    tooltip.classList.remove('is-visible');
  });

  // Hide on scroll for clean UX
  window.addEventListener('scroll', function() {
    if (activeTarget) {
      activeTarget.classList.remove('mc-slot-hover');
      activeTarget = null;
      tooltip.classList.remove('is-visible');
    }
  }, { passive: true });

})();
