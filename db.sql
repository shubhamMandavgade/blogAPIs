use blog;

create table articles(
arcticle_id int AUTO_INCREMENT primary key,
title varchar(50) not null,
nickname varchar(50) not null,
content text not null,
created_at timestamp not null
);

create table comments(
cmt_id int AUTO_INCREMENT primary key,
nickname varchar(50) not null,
comment_cont text not null,
created_at timestamp not null,
FK_arcticle_id int,
FOREIGN KEY (FK_arcticle_id)
        REFERENCES articles(arcticle_id)
);


use blog;
create table comments_on_comments(
id int auto_increment primary key,
nickname varchar(50) not null,
comments text not null,
created_at timestamp not null,
comment_id int,
foreign key(comment_id) references comments(cmt_id)
);




use blog;

select * from comments where FK_arcticle_id=1;

SELECT 
A.arcticle_id as article_id, A.title as title, A.nickname as nickname,A.content as content,
C.cmt_id as comment_id, C.nickname as cmt_nickname,C.comment_cont as comments, A.created_at as blog_created_at, C.created_at as cooment_at
from articles A
left join 
comments C on A.arcticle_id = C.FK_arcticle_id;


use blog;
SELECT 
C.cmt_id as cmt_id, C.nickname as cmt_nickname,C.comment_cont as comments,
CC.id as subCmtId, CC.nickname as nickname, CC.comments as subCmt,
C.created_at as cmt_created_at, CC.created_at as subCmt_at
from comments C
left join 
comments_on_comments CC on C.cmt_id = CC.comment_id;