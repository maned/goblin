changeContent = function(key) {
  html = textHash[key];
  $('#content').html(html);
}

$("#menu a").click(function(e) {
  //$('#menu').collapse('hide');
  changeContent(e.target.innerText);
});

textHash = {
  "Futurama": "<h1>Bendin' in the Wind</h1><p>Oh, but you can. But you may have to metaphorically make a deal with the devil.  And by \"devil\", I mean Robot Devil.  And by \"metaphorically\", I mean get your coat. Say what? Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars. Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! Michelle, I don't regret this, but I both rue and lament it.</p>",
  "Star Wars": "<h1>The Empire Strikes Back</h1><p>Remember, a Jedi can feel the Force flowing through him. Look, I can take you as far as Anchorhead. You can get a transport there to Mos Eisley or wherever you're going. She must have hidden the plans in the escape pod. Send a detachment down to retrieve them, and see to it personally, Commander. There'll be no one to stop us this time!</p>",
  "Doctor Who": "<h1>The Poison Sky</h1><p>Stop talking, brain thinking. Hush. You hit me with a cricket bat. You've swallowed a planet! Stop talking, brain thinking. Hush. It's a fez. I wear a fez now. Fezes are cool. Annihilate? No. No violence. I won't stand for it. Not now, not ever, do you understand me?! I'm the Doctor, the Oncoming Storm - and you basically meant beat them in a football match, didn't you?</p>"
};