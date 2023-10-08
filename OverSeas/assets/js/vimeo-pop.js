function videoId(button) {
  var $videoUrl = button.attr("data-video");
  if ($videoUrl !== undefined) {
    var $videoUrl = $videoUrl.toString();
    var srcVideo;

    if ($videoUrl.indexOf("youtube") !== -1) {
      var et = $videoUrl.lastIndexOf("&");
      if (et !== -1) {
        $videoUrl = $videoUrl.substring(0, et);
      }
      var embed = $videoUrl.indexOf("embed");
      if (embed !== -1) {
        $videoUrl =
          "https://www.youtube.com/watch?v=" +
          $videoUrl.substring(embed + 6, embed + 17);
      }

      srcVideo =
        "https://www.youtube.com/embed/" +
        $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
        "?autoplay=1&mute=1&loop=1&playlist=" +
        $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
        "";
    } else if ($videoUrl.indexOf("youtu") !== -1) {
      var et = $videoUrl.lastIndexOf("&");
      if (et !== -1) {
        $videoUrl = $videoUrl.substring(0, et);
      }
      var embed = $videoUrl.indexOf("embed");
      if (embed !== -1) {
        $videoUrl =
          "https://youtu.be/" + $videoUrl.substring(embed + 6, embed + 17);
      }

      srcVideo =
        "https://www.youtube.com/embed/" +
        $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
        "?autoplay=1&mute=1&loop=1&playlist=" +
        $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
        "";
    } else if ($videoUrl.indexOf("vimeo") !== -1) {
      srcVideo =
        "https://player.vimeo.com/video/" +
        $videoUrl
          .substring($videoUrl.indexOf(".com") + 5, $videoUrl.length)
          .replace("/", "") +
        "?autoplay=1";
    } else if ($videoUrl.indexOf("mp4") !== -1) {
      return (
        '<video loop playsinline autoplay><source src="' +
        $videoUrl +
        '" type="video/mp4"></video>'
      );
    } else if ($videoUrl.indexOf("m4v") !== -1) {
      return (
        '<video loop playsinline autoplay><source src="' +
        $videoUrl +
        '" type="video/mp4"></video>'
      );
    } else {
      alert(
        "The video assigned is not from Youtube, Vimeo or MP4, remember to enter the correct complete video link .\n - Youtube: https://www.youtube.com/watch?v=43ngkc2Ejgw\n - Vimeo: https://photovideo.photo.qq.com/1075_0b2eyt7atlyfimaivjpzhbrdnraebedqkhca.f0.mp4?dis_k=b6f8c166159dc6e7248a7b3efb3f88c2&dis_t=1672651860&vuin=2952467907&owner=Mjk1MjQ2NzkwNw==\n - MP4 https://server.com/file.mp4"
      );
      return false;
    }
    return (
      '<iframe src="' +
      srcVideo +
      '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    );
  } else {
    alert("No video assigned.");
    return false;
  }
}

document
  .querySelectorAll(".lets-play")
  .forEach((d) => d.addEventListener("click", playVideos));

function playVideos(e) {
  e.preventDefault();
  var $theVideo = videoId($(this));

  var appendVideo = document.createElement("div");

  if ($theVideo) {
    appendVideo.innerHTML +=
      '<div class="active video-modal-wrapp" id="video-wrap"><span onclick="lvideoClose();" class="video-overlay"></span><div class="video-container">' +
      $theVideo +
      '</div><button onclick="lvideoClose();" class="close-video">x</button></div>';

    document.body.appendChild(appendVideo);
  }
}

const lvideoClose = () => {
  const boxes = document.querySelectorAll(".video-modal-wrapp, .video-overlay");

  boxes.forEach((box) => {
    box.remove();
  });
};