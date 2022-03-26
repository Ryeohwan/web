var members= ['ryeoryeo','hwan','ahn'];
console.log(members[0]);
var i = 0;
while(i < members.length){
  console.log(members[i]);
  i++;
}
var roles = {
  'bug':'ryeoryeo',
  'hard bug':'hwan',
  'critic bug':'ahn'
}

for(var name in roles){
  console.log('roles', name, 'value', roles[name]);
}
console.log(roles.bug);
