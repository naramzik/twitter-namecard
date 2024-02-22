import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ProfileCardProps {
  twitterNickname: string;
  twitterId: string;
  twitterBio: string;
  twitterImage: string;
  hashtags: string[];
  instagramId: string;
  githubId: string;
  blog: string;
}

const NameCard = ({
  twitterNickname,
  twitterId,
  twitterBio,
  twitterImage,
  hashtags,
  instagramId,
  githubId,
  blog,
}: ProfileCardProps) => {
  return (
    <div className="card glass bg-white shadow-md aspect-nameCard">
      <div className="card-body flex flex-row justify-between">
        <section className="flex flex-col justify-between items-start">
          <div>
            <h1 className="text-xl font-black">{twitterNickname}</h1>
            {twitterId && <div>@{twitterId}</div>}
            {twitterBio && <div className="text-xs italic mt-2">"{twitterBio}"</div>}
          </div>
          <div className="flex flex-wrap gap-1">
            {hashtags.map((hashtag) => (
              <div className="badge badge-ghost">#{hashtag}</div>
            ))}
          </div>
        </section>
        <section className="flex flex-col justify-between items-end">
          {twitterImage && (
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={twitterImage} />
              </div>
            </div>
          )}
          <div className="text-end">
            <div className="flex items-center justify-end">
              <FontAwesomeIcon icon={faInstagram} className="mr-1" />
              {instagramId}
            </div>
            <div className="flex items-center justify-end">
              <FontAwesomeIcon icon={faGithub} className="mr-1" />
              {githubId}
            </div>
            <div className="flex items-center justify-end">
              <FontAwesomeIcon icon={faPaperclip} className="mr-1" />
              {blog}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NameCard;
