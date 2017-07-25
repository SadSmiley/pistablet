@section('content')
@extends('layout')
<div class="container-fluid">
   <div class="events">
      <table style="width: 100%;">
         <tbody>
            <tr>
               <td colspan="2"><div class="title">{{ $post->post_title }}</div></td>
            </tr>
            <tr>
               <td class="main-event">
                  <div class="img">
                     <img src="{{ $post->post_image }}">
                  </div>
                  <div class="desc">{!! $post->post_content !!}</div>
               </td>
               <td class="side-event">
                  <?php $i = 0; ?>
                  @foreach($_related as $related)
                     @if($i == 0)
                     <div class="holder first" onClick="location.href='/events/view/{{ $related->main_id }}'" style="cursor: pointer;">
                        <div class="img">
                           <img class="4-3-ratio" src="{{ $related->post_image }}">
                        </div>
                        <div class="side-content">{{ $post->post_title }}</div>
                     </div>
                     @else
                     <table class="holder" onClick="location.href='/events/view/{{ $related->main_id }}'" style="cursor: pointer;">
                        <tbody>
                           <tr>
                              <td class="img">
                                 <img class="4-3-ratio" src="{{ $related->post_image }}">
                              </td>
                              <td class="side-content">{{ $post->post_title }}</td>
                           </tr>
                        </tbody>
                     </table>
                     @endif
                     <?php $i++; ?>
                  @endforeach
               </td>
            </tr>
            <tr>
               <td class="text-center" colspan="2">
                  <button type="button" onClick="location.href='/events'" class="btn back">&laquo; Go Back</button>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/events-view.css">
@endsection
@section('script')
<script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
<script type="text/javascript" src="resources/assets/frontend/js/events.js"></script>
@endsection