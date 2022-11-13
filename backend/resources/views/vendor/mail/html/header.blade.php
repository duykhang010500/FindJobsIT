<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'FindJobIt')
<img src="https://i.pinimg.com/736x/91/25/28/912528b76413ac084f6ede3d0b71ab35.jpg" class="logo" alt="FindJobIt Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
