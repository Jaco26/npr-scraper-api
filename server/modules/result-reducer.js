const elTypes = {
  basic: 1,
  attachment: 2,
  standard: 3
};

const sectionTypes = {
  featured: 1,
  general: 2,
};

const handleArticles = (root, section) => {
  return root.articles.reduce((a, b) => {
    a = [...a, {
      elementType: elTypes.standard,
      sectionType: sectionTypes[section],
      ...b,
    }];
    return a;
  }, []);
}

const handleArticle = (article, section) => {
  return {
    elementType: elTypes.standard,
    sectionType: sectionTypes[section],
    ...article,
  }
}

const handleAttachments = (attachements, parentArticle, section) => {
  return attachements.map(attachment => {
    attachment.storyNumber = parentArticle.storyNumber;
    return {
      elementType: elTypes.attachment,
      sectionType: sectionTypes[section],
      ...attachment,
    }
  })
}

const handeAttachmentGroups = (root, section) => {
  return root.attachmentGroups.reduce((a, b) => {
    let article = handleArticle(b.article, section);
    let attachments = handleAttachments(b.attachments, b.article, section);
    let current = [article, ...attachments];
    a = [...a, ...current];
    return a;
  }, []);
}

const handleFeaturedGroup = (root) => {
  return root.featuredGroup.reduce((a, b) => {
    let featured = b.featured.map(article => {
      let elType;
      if (article.classes.includes('hp-item-basic')) {
        elType = elTypes.basic;
      } else if (article.classes.includes('attachment')) {
        elType = elTypes.attachment;
      } else {
        elType = elTypes.standard;
      }
      return {
        elementType: elType,
        sectionType: sectionTypes.featured,
        ...article
      };
    });
    a = [...a, ...featured]
    return a;
  }, []);
}


const featured = ({ featuredStories }) => {
  const keys = Object.keys(featuredStories);
  return keys.reduce((a, b) => {
    let current;
    switch (b) {
      case 'articles':
        current = handleArticles(featuredStories, 'featured');
        break;
      case 'attachmentGroups':
        current = handeAttachmentGroups(featuredStories, 'featured');
        break;
      case 'featuredGroup':
        current = handleFeaturedGroup(featuredStories);
        break;
      default:
        return a;
    }
    a = [...a, ...current];
    return a;
  }, [])
}

const general = ({ generalContent }) => {
  const keys = Object.keys(generalContent);
  return keys.reduce((a, b) => {
    let current;
    switch (b) {
      case 'articles':
        current = handleArticles(generalContent, 'general');
        break;
      case 'attachmentGroups':
        current = handeAttachmentGroups(generalContent, 'general');
        break;
      default:
        return a;
    }
    a = [...a, ...current];
    return a;
  }, []);
}

const resultReducer = (results) => {
  return [...featured(results), ...general(results)];
}

module.exports = resultReducer

