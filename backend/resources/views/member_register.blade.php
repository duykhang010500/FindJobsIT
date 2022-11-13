@component('mail::layout')
{{-- Header --}}
@slot('header')
    @component('mail::header', ['url' => config('app.url')])
        WELCOME TO FIND JOB IT
    @endcomponent
@endslot
{{-- Subcopy --}}
@isset($subcopy)
    @slot('subcopy')
        @component('mail::subcopy')
            {{ $member }}
        @endcomponent
    @endslot
@endisset

  {{-- Footer --}}
    @slot('footer')
    @component('mail::footer')
        © {{ date('Y') }} {{ config('app.name') }}.
    @endcomponent
    @endslot
    @endcomponent