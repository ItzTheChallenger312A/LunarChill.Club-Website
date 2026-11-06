/**
 * LunarChill - Minecraft Inventory & Recipe Tooltip Engine
 * Faithful recreation of Minecraft in-game GUI tooltip & slot hover behavior.
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

    // Direct data attribute override
    if (el.dataset && el.dataset.mcTooltip) {
      return el.dataset.mcTooltip.trim();
    }

    // Finished crafted item box (.item-sprite-box)
    if (el.classList.contains('item-sprite-box') || el.closest('.item-sprite-box')) {
      const box = el.classList.contains('item-sprite-box') ? el : el.closest('.item-sprite-box');
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
    }

    // Recipe ingredient (.recipe-ing)
    if (el.classList.contains('recipe-ing') || el.closest('.recipe-ing')) {
      const ing = el.classList.contains('recipe-ing') ? el : el.closest('.recipe-ing');
      
      // Check explicit data attribute on ing
      if (ing.dataset && ing.dataset.mcTooltip) {
        return ing.dataset.mcTooltip.trim();
      }

      // Check img alt inside ingredient
      const img = ing.querySelector('img');
      if (img && img.alt) {
        const altClean = cleanItemName(img.alt);
        // If alt is generic like "Thịt Nướng" or "Heart", check text
        if (altClean && altClean.length > 2 && !altClean.includes('Heart')) {
          return altClean;
        }
      }

      // Extract text content inside recipe-ing
      const text = ing.textContent.trim();
      // Skip action text like "Hạ Trial Spawner", "nướng chín ➜", "thả xuống nước"
      if (/^(Hạ |Kích hoạt|Thánh hóa|Mở |nướng|thả|\d+%)/i.test(text)) {
        // Look for item names mentioned in the text if any
        const match = text.match(/\b(Gilded Purpur Key|Purpur Key|Winged Key|Enderite Upgrade Template|Dragon Wings|Tamaris|Crest of The End|Ender Insignia|Ender Pearl|Shulker Shell|Shulker Body|Harvester|Dragonblade)\b/i);
        if (match) return match[1];
        return cleanItemName(text);
      }
      return cleanItemName(text);
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
    if (el.tagName === 'IMG' && el.alt) {
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

  // 5. Global event delegation
  document.addEventListener('mouseover', function(e) {
    const target = e.target.closest('.item-sprite-box, .recipe-ing, .pendant-variant-card, .jewel-buff-card, [data-mc-tooltip]');
    if (!target) return;

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
