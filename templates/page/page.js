import React from 'react';
import PropTypes from 'prop-types';
import styles from './TemplateName.module.scss';
import StandardFluidLayout from 'layout/StandardFluidLayout/StandardFluidLayout';
import Query from 'components/Query/Query';
import { client } from 'lib/apollo-client';


const TemplateName = () => {

  
  // const _getTemplateName = React.useCallback(async () => {
  //   const { data } = await client.query({
  //     query: getTemplateName,
  //     variables: {
  //       options: {},
  //     },
  //   });
  //   return data;
  // }, []);

  
  return (
    <StandardFluidLayout>
      <Query queryFn={'_getTemplateName'} queryKey={'queryKey'}>
        {({ data }) => {
          return (
            <div className={styles.TemplateName} data-testid='TemplateName'>
              Hello from TemplateName Page
            </div>
          );
        }}
      </Query>
    </StandardFluidLayout>
  );
};

TemplateName.propTypes = {};

TemplateName.defaultProps = {};

export default TemplateName;
