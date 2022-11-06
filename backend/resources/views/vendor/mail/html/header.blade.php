<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'FindJobIt')
<img src="{{ asset('images/logo.jpg') }}" class="logo" alt="FindJobIt Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
