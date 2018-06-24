const pool = require('../pool');
const router = require('express').Router();
// Practice json file
const results730PM = require('../practiceJSON/7:30.json');




const flattened = (results) => {
/**
 * Reduce results into a single array of Article objects.
 * Each element in the array should be assigned an:
 *  - elementType (for the element_types table)
 *    - 'basic', 'attachement' or 'standard'
 *  - sectionType (for the section_types table)
 *    - 'featured' or 'general'
*/

  const featured = ({featuredStories}) => {
    const keys = Object.keys(featuredStories);
    return keys.reduce( (a, b) => {
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

  const general = ({generalContent}) => {
    const keys = Object.keys(generalContent);
    return keys.reduce( (a, b) => {
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


  return [...featured(results), ...general(results)];


}


router.get('/', (req, res) => {
  res.send( flattened(results730PM) );
})

module.exports = router


function handleArticles(root, section) {
  return root.articles.reduce((a, b) => {
    a = [...a, {
      elementType: 'standard',
      sectionType: section,
      ...b,
    }];
    return a;
  }, []);
}

function handeAttachmentGroups(root, section) {
  function handleArticle(article) {
    return {
      elementType: 'standard',
      sectionType: section,
      ...article,
    }
  }
  function handleAttachments(attachements) {
    return attachements.map(attachment => {
      return {
        elementType: 'attachement',
        sectionType: section,
        ...attachment,
      }
    })
  }

  return root.attachmentGroups.reduce((a, b) => {
    let article = handleArticle(b.article);
    let attachments = handleAttachments(b.attachments);
    let current = [article, ...attachments];
    a = [...a, ...current];
    return a;
  }, []);
}

function handleFeaturedGroup(root) {
  return root.featuredGroup.reduce((a, b) => {
    let featured = b.featured.map(article => {
      let elType;
      if (article.classes.includes('hp-item-basic')) {
        elType = 'basic';
      } else if (article.classes.includes('attachment')) {
        elType = 'attachment';
      } else {
        elType = 'standard';
      }
      return {
        elementType: elType,
        sectionType: 'featured',
        ...article
      };
    });
    a = [...a, ...featured]
    return a;
  }, []);
}