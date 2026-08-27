@props(['id', 'icon', 'active' => false])
<li><a id="{{ $id }}" {{ $attributes->merge(['class' => ($active ?? false) ? 'active' : '']) }}><span class="sidebar-link-icon-container"><i class="{{ $icon }}"></i></span><span class="sidebar-link-text">{{ $slot }}</span></a></li>
