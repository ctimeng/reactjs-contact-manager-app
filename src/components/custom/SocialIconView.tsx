const SocialIconView = (props: any) => {
  const socialNetworkIcon = (social: string) => {
    switch (social) {
      case "twitter":
        return <i className="fab fa-twitter fa-fw"></i>;
      case "instagram":
        return <i className="fab fa-instagram fa-fw"></i>;
      case "linkedin":
        return <i className="fab fa-linkedin fa-fw"></i>;
      case "skype":
        return <i className="fab fa-skype fa-fw"></i>;
      default:
        return <i className="fab fa-facebook-f fa-fw"></i>;
    }
  };

  return socialNetworkIcon(props.social);
};

export default SocialIconView
