Installation from RPM packages
For the <release series> specify the major version number, without dot, and with an appended x.
The latest <release series> is 311x.
For older releases, the <release series> can be one of 30x, 22x, or 21x.
(Not all versions of Apache Cassandra are available, since building RPMs is a recent addition to the project.)

Add the Apache repository of Cassandra to /etc/yum.repos.d/cassandra.repo, for example for the latest 3.11 version:
[cassandra]
name=Apache Cassandra
baseurl=https://www.apache.org/dist/cassandra/redhat/311x/
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://www.apache.org/dist/cassandra/KEYS
Install Cassandra, accepting the gpg key import prompts:
sudo yum install cassandra
