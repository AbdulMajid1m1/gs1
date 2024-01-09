import React from 'react'

const BlogPages = () => {
  return (
    <div>BlogPages</div>
  )
}

export default BlogPages


// @extends('frontend.layout.frontend')


// @section('content')


// @push('seo')
//         <meta name='description' content="{{$page->seo_description}}">
// @endpush
// <?php 
//     // echo "<pre>"; print_r($page->sections); exit();
// ?>
//  @if ($page->sections != null)
//         @foreach ($page->sections as $sections)
//             @include('frontend.sections.'.$sections, $page)
//         @endforeach

//     @endif

// @endsection